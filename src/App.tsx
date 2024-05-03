import { useContext, useEffect } from 'react'
import useRouteElements from './routes/useRouteElements'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

export default function App() {
  // Listen event refresh_token is expired so I can reset global state
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  const routeElements = useRouteElements()
  return <div>{routeElements}</div>
}
