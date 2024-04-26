import useRouteElements from './routes/useRouteElements'

export default function App() {
  const routeElements = useRouteElements()
  return <div>{routeElements}</div>
}
