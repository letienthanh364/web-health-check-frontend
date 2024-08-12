import { useEffect, useState } from 'react'
import { websiteQuery } from '../../hooks/queries/useWebsiteQuery'
import { getIdFromNameId } from '../../utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'
import { WebsiteUpdate } from '../../types/website.type'
import WebsiteUpdateForm from './WebsiteUpdateForm'
import WebsiteContactList from './WebsiteContactList'
import WebsiteChecktimeList from './WebsiteChecktimeList'
import mainPath from '../../constants/path'
import DialogPopup from '../../components/DialogPopup'

export default function WebsiteDetail() {
  const { id } = useParams()
  const websiteId = getIdFromNameId(id as string)

  const { data: websiteData } = websiteQuery.useGetWebsiteDetai(websiteId)
  const website = websiteData?.data.data

  //! Use update website form
  const [updating, setUpdating] = useState(false)
  const methods = useForm<WebsiteUpdate>({
    defaultValues: {
      name: website?.name || '',
      path: website?.path || '',
      default_email: website?.default_email || '',
      time_interval: website?.time_interval || 84400,
      retry: website?.retry || 0
    }
  })
  const { handleSubmit, reset, setValue } = methods
  useEffect(() => {
    if (website) {
      setValue('name', website.name)
      setValue('path', website.path)
      setValue('default_email', website.default_email)
      setValue('time_interval', website.time_interval)
      setValue('retry', website.retry)
    }
  })

  //! Update website
  const createWebsiteMutation = websiteQuery.mutation.useUpdateWebsite(websiteId)
  const onSubmit = handleSubmit(async (data) => {
    createWebsiteMutation.mutate(
      { id: websiteId, body: data },
      {
        onSuccess() {
          setUpdating(false)
          reset()
        },
        onError(err) {
          console.error(err)
        }
      }
    )
  })

  //! Delete website
  const navigate = useNavigate()
  const deleteWebMutation = websiteQuery.mutation.useDeleteWebsite()
  const [deleteDialog, setDeleteDialog] = useState(false)

  const handleDelete = () => {
    setDeleteDialog(false)
    deleteWebMutation.mutate(websiteId, {
      onSuccess() {
        navigate(mainPath.website)
      },
      onError(err) {
        console.error(err)
      }
    })
  }

  if (!website) {
    return <div>Website not found</div>
  }
  return (
    <div className='flex items-center justify-center py-10'>
      <div className='bg-darkblue-800 p-8 rounded-lg shadow-md w-11/12 max-w-4xl'>
        <h1 className='text-2xl font-bold mb-6 text-center text-white'>{website.name}</h1>
        <div className='text-white font-semibold space-y-4'>
          <p>Path: {website.path}</p>
          <p>Time interval: {website.time_interval}</p>
          <p>Retry: {website.retry}</p>
          <p>Default Email: {website.default_email}</p>
        </div>
        <div className='mt-6 space-x-2'>
          <button
            onClick={() => {
              setUpdating(!updating)
            }}
            className={classNames(' text-white py-2 px-4 rounded  mr-2', {
              'bg-blue-500 hover:bg-blue-600': !updating,
              'bg-red-500 hover:bg-red-600': updating
            })}
          >
            {updating ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {updating && (
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <WebsiteUpdateForm />
            </form>
          </FormProvider>
        )}

        <WebsiteContactList websiteId={websiteId} isUpdating={updating} />
        <WebsiteChecktimeList websiteId={websiteId} isUpdating={updating} />

        <div className='w-full flex justify-end'>
          <button
            onClick={() => setDeleteDialog(true)}
            className='bg-red-500 hover:bg-red-600 font-medium rounded-xl py-1 px-4'
          >
            Delete
          </button>
        </div>
      </div>

      <DialogPopup isOpen={deleteDialog} handleClose={() => setDeleteDialog(false)}>
        <p className='font-medium text-lg text-red-600'>Are you sure to delete this website?</p>
        <button onClick={handleDelete} className='py-2 mt-6 px-4 rounded-xl hover:bg-red-600 bg-red-500'>
          Delete
        </button>
      </DialogPopup>
    </div>
  )
}
