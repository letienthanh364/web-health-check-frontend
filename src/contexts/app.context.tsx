import { useQueryClient } from '@tanstack/react-query'
import { useState, createContext } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from '../types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  handleLogout: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  loadingPage: false,
  setLoadingPage: () => null,

  handleLogout: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    queryClient.removeQueries({
      queryKey: ['purchases']
    })
  }

  return (
    <AppContext.Provider
      value={{
        handleLogout,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        loadingPage,
        setLoadingPage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
