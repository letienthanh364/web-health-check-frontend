import { useForm } from 'react-hook-form'
import { WebsiteCreate } from '../../types/website.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import websiteApi from '../../apis/website.api'
import { useNavigate } from 'react-router-dom'
import mainPath from '../../constants/path'
import { generateNameId } from '../../utils/utils'

export default function WebsiteCreatePage() {
  const { handleSubmit, reset, register, watch } = useForm<WebsiteCreate>({
    defaultValues: {
      name: '',
      path: '',
      default_email: '',
      time_interval: 84400,
      retry: 1
    }
  })

  //! Create website
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const createWebsiteMutation = useMutation({
    mutationFn: websiteApi.addWebsite,
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['websites'] })
    }
  })

  const invalidForm = watch('name') == '' || watch('path') == '' || watch('default_email') == ''
  const onInvalid = (errors: any) => {
    console.error(errors)
  }
  const onSubmit = async (data: WebsiteCreate) => {
    createWebsiteMutation.mutate(data, {
      onSettled() {},
      onSuccess(res) {
        reset()
        navigate({
          pathname: `${mainPath.website}/${generateNameId({ name: data.name, id: res.data.data.toString() })}`
        })
      },
      onError(err) {
        console.error(err)
      }
    })
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-darkblue-800 p-8 rounded-lg shadow-md w-11/12 max-w-4xl'>
        <h1 className='text-2xl font-bold mb-6 text-center text-white'>Create New Website</h1>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='flex flex-col space-y-4'>
          <div>
            <p className='block text-white font-semibold mb-2'>Name</p>
            <input
              type='text'
              id='name'
              className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
              required
              {...register('name')}
            />
          </div>
          <div>
            <p className='block text-white font-semibold mb-2'>Path</p>
            <input
              type='text'
              id='path'
              className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
              required
              {...register('path')}
            />
          </div>
          <div>
            <p className='block text-white font-semibold mb-2'>Emails</p>
            <input
              id='default_email'
              className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
              required
              {...register('default_email')}
            />
          </div>
          <div>
            <p className='block text-white font-semibold mb-2'>Time Interval (in seconds)</p>
            <input
              type='number'
              id='time_interval'
              className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
              required
              {...register('time_interval')}
            />
          </div>
          <div>
            <p className='block text-white font-semibold mb-2'>Retry</p>
            <input
              type='number'
              id='retry'
              className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
              required
              {...register('retry')}
            />
          </div>

          <button
            disabled={invalidForm}
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-40 disabled:hover:bg-green-500 disabled:cursor-not-allowed'
          >
            Create Website
          </button>
        </form>
      </div>
    </div>
  )
}
