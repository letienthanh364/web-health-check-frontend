import { Outlet, useRoutes } from 'react-router-dom'
import mainPath from '../constants/path'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout'
import LoginPage from '../pages/LoginPage'
import Websites from '../pages/Websites'
import WebsiteDetail from '../pages/WebsiteDetail'
import { Suspense } from 'react'
import LoadingWithEmptyContent from '../components/LoadingWithEmptyContent'
import WebsiteCreatePage from '../pages/WebsiteCreatePage'

function MainRouteWrapper() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingWithEmptyContent />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainRouteWrapper />,
      children: [
        {
          path: mainPath.home,
          element: <HomePage />
        },
        {
          path: mainPath.login,
          element: <LoginPage />
        },
        {
          path: mainPath.website,
          element: <Websites />
        },
        {
          path: mainPath.websiteDetail,
          element: <WebsiteDetail />
        },
        {
          path: mainPath.websiteCreate,
          element: <WebsiteCreatePage />
        }
      ]
    }
  ])
  return routeElements
}
