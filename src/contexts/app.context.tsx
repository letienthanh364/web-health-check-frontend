import { useState, createContext } from 'react'
import { clearLS, getAccessTokenFromLS } from '../utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  handleLogout: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  loadingPage: false,
  setLoadingPage: () => null,

  handleLogout: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearLS()
  }

  return (
    <AppContext.Provider
      value={{
        handleLogout,
        isAuthenticated,
        setIsAuthenticated,
        loadingPage,
        setLoadingPage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
