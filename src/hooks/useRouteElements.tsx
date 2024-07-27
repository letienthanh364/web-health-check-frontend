import { useRoutes } from 'react-router-dom'
import mainPath from '../constants/path'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: mainPath.home,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
