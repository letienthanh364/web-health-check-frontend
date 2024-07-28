import { useState } from 'react'
import { websiteQuery } from '../../hooks/queries/useWebsiteQuery'
import { getIdFromNameId } from '../../utils/utils'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

export default function WebsiteDetail() {
  const { id } = useParams()
  const websiteId = getIdFromNameId(id as string)

  const { data: websiteData } = websiteQuery.useGetWebsiteDetai(Number(websiteId))
  const website = websiteData?.data.data

  const { data: contactsData } = websiteQuery.useListContactsForWebsite(Number(websiteId))
  const contactList = contactsData?.data.data || []

  const [isManagingContacts, setIsManagingContacts] = useState(false)

  //! Delete contact
  const deleteContactMutation = websiteQuery.mutation.useDeleteContactForWebsite()
  const handleRemoveContact = (id: number) => {
    deleteContactMutation.mutate(String(id))
  }

  //! Add contact
  const [newContact, setNewContact] = useState({ contact_address: '', contact_method: '' })
  const addContactMutation = websiteQuery.mutation.useAddContactForWebsite()
  const handleAddContact = () => {
    addContactMutation.mutate({ id: websiteId, body: newContact })
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
          <p>Limit: {website.limit}</p>
          <p>Retry: {website.retry}</p>
          <p>Default Email: {website.default_email}</p>
        </div>
        <div className='mt-6'>
          <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2'>Edit</button>
          <button
            onClick={() => setIsManagingContacts(!isManagingContacts)}
            className={classNames(' text-white py-2 px-4 rounded', {
              'bg-green-500 hover:bg-green-600': !isManagingContacts,
              'bg-red-500 hover:bg-red-600': isManagingContacts
            })}
          >
            {isManagingContacts ? 'Cancel' : 'Contact Manage'}
          </button>
        </div>
        <div className='mt-6'>
          <h2 className='text-xl font-bold mb-4 text-white'>Contacts</h2>
          {contactList.map((contact, index) => (
            <div key={index} className='bg-darkblue-700 p-4 mb-4 rounded'>
              <div className='grid grid-cols-6 gap-6 items-center'>
                <div className='col-span-3 overflow-hidden'>
                  <strong className=''>Address: </strong>
                  <p className='line-clamp-1 '>{contact.contact_address}</p>
                </div>
                <div className='col-span-2 overflow-hidden'>
                  <strong className=''>Method: </strong>
                  <p className='capitalize'></p>
                  {contact.contact_method}
                </div>
                {isManagingContacts && (
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className='bg-red-500 col-span-1 text-white py-2 px-4 rounded hover:bg-red-600 ml-4'
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          {isManagingContacts && (
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
                      className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
                    />
                  </div>
                  <div className=' space-y-4 w-1/4'>
                    <p className='text-white'>
                      <strong>Method:</strong>
                    </p>
                    <input
                      type='text'
                      value={newContact.contact_method}
                      onChange={(e) => setNewContact({ ...newContact, contact_method: e.target.value })}
                      className='p-2 bg-darkblue-600 border border-darkblue-500 rounded w-full text-white'
                    />
                  </div>
                </div>
                <div className='flex justify-end mt-4'>
                  <button
                    onClick={handleAddContact}
                    className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
