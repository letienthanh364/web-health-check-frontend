import { useFormContext } from 'react-hook-form'
import { WebsiteUpdate } from '../../types/website.type'

export default function WebsiteUpdateForm() {
  const { register } = useFormContext<WebsiteUpdate>()

  return (
    <div className='flex flex-col space-y-4 py-10'>
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
        <p className='block text-white font-semibold mb-2'>Default email</p>
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
          {...register('time_interval', { valueAsNumber: true })}
        />
      </div>
      <div>
        <p className='block text-white font-semibold mb-2'>Retry</p>
        <input
          type='number'
          id='retry'
          className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
          required
          {...register('retry', { valueAsNumber: true })}
        />
      </div>

      <button
        type='submit'
        className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-40 disabled:hover:bg-green-500 disabled:cursor-not-allowed'
      >
        Update Website
      </button>
    </div>
  )
}
