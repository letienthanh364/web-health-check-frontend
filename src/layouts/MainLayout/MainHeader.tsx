import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from '../../constants/path'
import { AppContext } from '../../contexts/app.context'

export default function MainHeader() {
  const { isAuthenticated, handleLogout } = useContext(AppContext)

  return (
    <div className='w-full px-10 bg-darkblue-900 '>
      <div className='container'>
        <div className='flex justify-between items-center w-full h-20'>
          <NavLink to={mainPath.home} className='uppercase text-xl font-semibold tracking-widest'>
            Web Health Check
          </NavLink>

          <div className='flex items-center font-medium text-lg'>
            {isAuthenticated && (
              <div className='flex items-center space-x-6'>
                <NavLink className='hover:text-primaryColor uppercase' to={mainPath.website}>
                  Websites
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout()
                  }}
                  className='hover:text-primaryColor uppercase'
                >
                  Logout
                </button>
              </div>
            )}

            {!isAuthenticated && (
              <NavLink className='hover:text-primaryColor uppercase' to={mainPath.login}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
