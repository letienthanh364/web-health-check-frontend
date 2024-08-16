import { NavLink } from 'react-router-dom'
import { websiteQuery } from '../../hooks/queries/useWebsiteQuery'
import WebsiteCard from './WebsiteCard'
import mainPath from '../../constants/path'

export default function Websites() {
  const { data: websitesData } = websiteQuery.useListWebsites({})
  const websites = websitesData?.data.data || []

  return (
    <div className='container'>
      <div className='flex items-center py-20 justify-center '>
        <div className='bg-darkblue-800 p-8 rounded-lg shadow-md '>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-center items-center text-white'>Website List</h1>
            <NavLink to={mainPath.websiteCreate} className='rounded-lg bg-green-500 hover:bg-green-600 py-2 px-4'>
              Add website
            </NavLink>
          </div>
          <div className='min-w-full bg-darkblue-700 text-white mt-6'>
            <div>
              <div className='w-full grid py-4 grid-cols-8 border-b border-darkblue-600'>
                <p className=' col-span-2 px-4 '>Name</p>
                <p className=' col-span-2 px-4'>Path</p>
                <p className=' col-span-1 px-4'>Limit</p>
                <p className=' col-span-1 px-4'>Retry</p>
                <p className=' col-span-2 px-4'>Default Email</p>
              </div>
            </div>
            <div className='w-full'>
              {websites.map((website) => (
                <WebsiteCard key={website.id} website={website} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
