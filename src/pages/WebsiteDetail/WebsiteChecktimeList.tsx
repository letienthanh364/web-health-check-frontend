import { useState } from 'react'
import { websiteQuery } from '../../hooks/queries/useWebsiteQuery'
import { parseCronToTime } from '../../utils/utils'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import classNames from 'classnames'

interface Props {
  websiteId: string
  isManagingChecktimes: boolean
}

export default function WebsiteChecktimeList({ websiteId, isManagingChecktimes }: Props) {
  const { data: checktimesData } = websiteQuery.useListChecktimesForWebsite(websiteId)
  const checktimeList = checktimesData?.data.data || []

  const [newChecktime, setNewChecktime] = useState('* * * * *')
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)

  const handleSelectHour = (index: number) => {
    setHour(index)
    setNewChecktime(`${minute || '0'} ${index || '0'} * * *`)
  }

  const handleSelectMinute = (index: number) => {
    setMinute(index)
    setNewChecktime(`${index || '0'} ${hour || '0'} * * *`)
  }

  //! Add Checktime
  const addChecktimeMutation = websiteQuery.mutation.useAddChecktimeForWebsite(websiteId)
  const handleAddChecktime = () => {
    addChecktimeMutation.mutate(
      { id: websiteId, body: { check_time: newChecktime } },
      {
        onSuccess: () => {
          setNewChecktime(`* * * * *`)
          setHour(0)
          setMinute(0)
        }
      }
    )
  }

  //! Delete Checktime
  const deleteChecktimeMutation = websiteQuery.mutation.useDeleteChecktimeForWebsite(websiteId)
  const handleRemoveChecktime = (id: number) => {
    deleteChecktimeMutation.mutate({ id: websiteId, body: { id: id } })
  }

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-4 text-white'>Checktimes</h2>
      {checktimeList.map((checktime, index) => (
        <div key={index} className='bg-darkblue-700 p-4 mb-4 rounded'>
          <div className='grid grid-cols-6 gap-6 items-center'>
            <div className='col-span-3 overflow-hidden'>
              <strong className=''>Cron string: </strong>
              <p className='line-clamp-1 '>{checktime.check_time}</p>
            </div>
            <div className='col-span-2 overflow-hidden'>
              <strong className=''>Time: </strong>
              <p className='capitalize'></p>
              {parseCronToTime(checktime.check_time)}
            </div>
            {isManagingChecktimes && (
              <button
                onClick={() => handleRemoveChecktime(checktime.id)}
                className='bg-red-500 col-span-1 text-white py-2 px-4 rounded hover:bg-red-600 ml-4'
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      {isManagingChecktimes && (
        <div className='mt-6'>
          <h3 className='text-lg font-bold mb-2 text-white'>Add New Checktime</h3>
          <div className='bg-darkblue-700 p-4 rounded mb-4'>
            <div className='flex space-x-8 items-center'>
              <div className=' space-y-4 w-1/4'>
                <p className='font-medium'>Hour</p>
                <Listbox value={hour} onChange={(val) => handleSelectHour(val)}>
                  <ListboxButton
                    className={classNames(
                      'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                  >
                    {hour}
                  </ListboxButton>
                  <ListboxOptions
                    anchor='bottom'
                    className={classNames(
                      'w-[var(--button-width)] rounded-xl border h-80 border-white/5 bg-white/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                  >
                    {Array(24)
                      .fill(0)
                      .map((_, index) => (
                        <ListboxOption
                          key={index}
                          value={index}
                          className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primaryColor'
                        >
                          <div className='text-sm/6 text-black'>{index}</div>
                        </ListboxOption>
                      ))}
                  </ListboxOptions>
                </Listbox>
              </div>

              <div className=' space-y-4 w-1/4'>
                <p className='font-medium'>Minute</p>
                <Listbox value={minute} onChange={(val) => handleSelectMinute(val)}>
                  <ListboxButton
                    className={classNames(
                      'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                  >
                    {minute}
                  </ListboxButton>
                  <ListboxOptions
                    anchor='bottom'
                    className={classNames(
                      'w-[var(--button-width)] rounded-xl border h-80 border-white/5 bg-white/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                  >
                    {Array(60)
                      .fill(1)
                      .map((_, index) => (
                        <ListboxOption
                          key={index}
                          value={index}
                          className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primaryColor'
                        >
                          <div className='text-sm/6 text-black'>{index}</div>
                        </ListboxOption>
                      ))}
                  </ListboxOptions>
                </Listbox>
              </div>
              <div className=' space-y-4 w-1/4'>
                <strong className=''>Time: </strong>
                <p className='capitalize'></p>
                {parseCronToTime(newChecktime)}
              </div>
            </div>
            <div className='flex justify-end mt-4'>
              <button
                onClick={handleAddChecktime}
                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
              >
                Add Checktime
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
