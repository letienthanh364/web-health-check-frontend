import { useRoutes } from 'react-router-dom'
import mainPath from '../constants/path'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout'
import LoginPage from '../pages/LoginPage'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: mainPath.home,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: mainPath.login,
      element: (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
