import { useRoutes } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'
import path from 'src/constants/path'
import ProductList from 'src/pages/ProductList'
import Product from 'src/pages/Product'
import Cart from 'src/pages/Cart'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/pages/ChangePassword'
import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'
import Profile from 'src/pages/User/pages/Profile'

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
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
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
    },
    {
      path: `${path.product}/:nameId`,
      element: (
        <MainLayout>
          <Product />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
