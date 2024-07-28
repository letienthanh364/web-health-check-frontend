import React, { useState } from 'react'
import checkerApi from '../../apis/checker.api'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    checkHealth(url)
  }

  const checkLinkMutation = useMutation({
    mutationFn: checkerApi.checkLink
  })
  const checkHealth = (url: string) => {
    checkLinkMutation.mutate(url, {
      onSuccess: (res) => {
        setStatus(res.data.status)
      }
    })
  }

  return (
    <div className='bg-darkblue-100 h-screen flex items-center justify-center'>
      <div className='container'>
        <div className='flex items-center justify-center w-full'>
          <div className='bg-darkblue-700 p-8 rounded-lg shadow-md w-96 '>
            <h1 className='text-2xl font-bold mb-6 text-center text-white'>Web Health Check</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label htmlFor='url' className='mb-2 font-semibold text-white'>
                Enter URL:
              </label>
              <input
                type='text'
                id='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='https://example.com'
                className='p-2 border border-darkblue-600 rounded mb-4 bg-darkblue-700 text-white'
                required
              />
              <button
                type='submit'
                className='bg-darkblue-600 text-white py-2 px-4 rounded hover:bg-darkblue-500 transition-colors'
              >
                Check Health
              </button>
            </form>
            {status && (
              <div className='mt-6 p-4 bg-darkblue-700 rounded font-bold'>
                <h2 className='text-xl mb-2 text-white'>Health Check Result</h2>
                <p className={classNames('uppercase', status == 'alive' ? 'text-green-600' : 'text-red-600')}>
                  {status}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
