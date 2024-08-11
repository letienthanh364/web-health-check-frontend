import { useState } from 'react'
import { websiteQuery } from '../../hooks/queries/useWebsiteQuery'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import classNames from 'classnames'

interface Props {
  websiteId: string
  isUpdating: boolean
}

const contactMethods = ['email', 'discord']

export default function WebsiteContactList({ websiteId, isUpdating }: Props) {
  const { data: contactsData } = websiteQuery.useListContactsForWebsite(websiteId)
  const contactList = contactsData?.data.data || []
  const [newContact, setNewContact] = useState({ contact_address: '', contact_method: '' })

  const handleSelectMethod = (method: string) => {
    setNewContact({ ...newContact, contact_method: method })
  }

  //! Add contact
  const addContactMutation = websiteQuery.mutation.useAddContactForWebsite(websiteId)
  const handleAddContact = () => {
    addContactMutation.mutate(
      { id: websiteId, body: newContact },
      {
        onSuccess: () => {
          setNewContact({ contact_address: '', contact_method: '' })
        }
      }
    )
  }

  //! Delete contact
  const deleteContactMutation = websiteQuery.mutation.useDeleteContactForWebsite(websiteId)
  const handleRemoveContact = (id: number) => {
    deleteContactMutation.mutate({ id: websiteId, body: { id: id } })
  }

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-4 text-white'>Contacts</h2>
      {contactList.map((contact, index) => (
        <div key={index} className='bg-darkblue-700 p-4 mb-4 rounded'>
          <div className='grid grid-cols-6 gap-6 items-center'>
            <div className='col-span-3 overflow-hidden'>
              <strong className=''>Address: </strong>
              <p className='line-clamp-1 '>{contact.address}</p>
            </div>
            <div className='col-span-2 overflow-hidden'>
              <strong className=''>Method: </strong>
              <p className='capitalize'></p>
              {contact.contact_method}
            </div>
            {isUpdating && (
              <button
                onClick={() => handleRemoveContact(contact.id)}
                className='bg-red-500 col-span-1 text-white py-1 text-sm px-2 rounded-xl hover:bg-red-600'
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      {isUpdating && (
        <div className='mt-6'>
          <h3 className='text-lg font-bold mb-2 text-white'>Add New Contact</h3>
          <div className='bg-darkblue-700 p-4 rounded mb-4'>
            <div className='flex justify-between space-x-8 items-center'>
              <div className=' space-y-4 w-3/4'>
                <p className='text-white'>
                  <strong>Address:</strong>
                </p>
                <input
                  type='text'
                  value={newContact.contact_address}
                  onChange={(e) => setNewContact({ ...newContact, contact_address: e.target.value })}
                  className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white min-h-10'
                />
              </div>

              <div className='w-1/4 max-w-md px-4 space-y-4'>
                <p className='text-white'>
                  <strong>Contact methods:</strong>
                </p>
                <Listbox value={newContact.contact_method} onChange={(val) => handleSelectMethod(val)}>
                  <ListboxButton
                    className={classNames(
                      'relative block w-full rounded-lg bg-darkblue-600 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white min-h-10',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 '
                    )}
                  >
                    {newContact.contact_method}
                  </ListboxButton>
                  <ListboxOptions
                    anchor='bottom'
                    className={classNames(
                      'w-[var(--button-width)] rounded-xl border max-h-80 border-white/5 bg-white/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                  >
                    {contactMethods.map((method) => (
                      <ListboxOption
                        key={method}
                        value={method}
                        className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primaryColor'
                      >
                        <div className='text-sm/6 text-black'>{method}</div>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>
            <div className='flex justify-end mt-12'>
              <button
                disabled={newContact.contact_address == '' || newContact.contact_method == ''}
                onClick={handleAddContact}
                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-40 disabled:hover:bg-green-500'
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
