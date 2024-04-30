import { useRoutes } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import Profile from 'src/pages/Profile'
import Register from 'src/pages/Register'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'
import path from 'src/constants/path'
import ProductList from 'src/pages/ProductList'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: <MainLayout />
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <RegisterHeader />
              <Login />
              <Footer />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <RegisterHeader />
              <Register />
              <Footer />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.products,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
