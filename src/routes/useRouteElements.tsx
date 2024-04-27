import { useRoutes } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <MainLayout />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <RegisterHeader />
          <Login />
          <Footer />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <RegisterHeader />
          <Register />
          <Footer />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}
