import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from '../../constants/path'
import { AppContext } from '../../contexts/app.context'

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext)

  return (
    <div className='w-full px-10 bg-darkblue-900 '>
      <div className='container'>
        <div className='flex justify-between items-center w-full h-20'>
          <NavLink to={mainPath.home} className='uppercase text-xl font-semibold tracking-widest'>
            Web Health Check
          </NavLink>

          <div className='flex items-center space-x-4 hover:text-primaryColor uppercase font-medium text-lg'>
            {isAuthenticated && <NavLink to={mainPath.website}>Websites</NavLink>}

            {!isAuthenticated && <NavLink to={mainPath.login}>Login</NavLink>}
          </div>
        </div>
      </div>
    </div>
  )
}
