import { useNavigate } from 'react-router-dom'
import { WebsiteModel } from '../../types/website.type'
import { generateNameId } from '../../utils/utils'
import mainPath from '../../constants/path'

interface Props {
  website: WebsiteModel
}

export default function WebsiteCard({ website }: Props) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate({ pathname: `${mainPath.website}/${generateNameId({ name: '', id: website.id })}` })
  }

  return (
    <button
      onClick={handleClick}
      className='text-center items-center py-4 hover:bg-darkblue-600 grid grid-cols-8 w-full border-b border-darkblue-600'
    >
      <p className=' col-span-2 px-4 '>{website.name}</p>
      <p className=' col-span-2 px-4 '>{website.path}</p>
      <p className=' col-span-1 px-4 '>{website.time_interval}</p>
      <p className=' col-span-1 px-4 '>{website.retry}</p>
      <p className=' col-span-2 px-4 '>{website.default_email}</p>
    </button>
  )
}
