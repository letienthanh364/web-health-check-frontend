import { useEffect, useState } from 'react'
import { websiteQuery } from '../../hooks/queries/useWebsiteQuery'
import { getIdFromNameId } from '../../utils/utils'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'
import { WebsiteUpdate } from '../../types/website.type'
import WebsiteUpdateForm from './WebsiteUpdateForm'

export default function WebsiteDetail() {
  const { id } = useParams()
  const websiteId = getIdFromNameId(id as string)

  const { data: websiteData } = websiteQuery.useGetWebsiteDetai(websiteId)
  const website = websiteData?.data.data

  const { data: contactsData } = websiteQuery.useListContactsForWebsite(websiteId)
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
    addContactMutation.mutate(
      { id: websiteId, body: newContact },
      {
        onSuccess: () => {
          setNewContact({ contact_address: '', contact_method: '' })
        }
      }
    )
  }

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
        <div className='mt-6'>
          <button
            onClick={() => {
              setUpdating(!updating)
              setIsManagingContacts(false)
            }}
            className={classNames(' text-white py-2 px-4 rounded  mr-2', {
              'bg-blue-500 hover:bg-blue-600': !updating,
              'bg-red-500 hover:bg-red-600': updating
            })}
          >
            {updating ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={() => {
              setIsManagingContacts(!isManagingContacts)
              setUpdating(false)
            }}
            className={classNames(' text-white py-2 px-4 rounded', {
              'bg-green-500 hover:bg-green-600': !isManagingContacts,
              'bg-red-500 hover:bg-red-600': isManagingContacts
            })}
          >
            {isManagingContacts ? 'Cancel' : 'Contact Manage'}
          </button>
        </div>

        {updating && (
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <WebsiteUpdateForm />
            </form>
          </FormProvider>
        )}

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
