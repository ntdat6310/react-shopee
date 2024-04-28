import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
