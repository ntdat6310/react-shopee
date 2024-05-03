import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './index.css'
import { AppProvider } from './contexts/app.context.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      /** If response is error because unauthorize => Call api to refresh token.
       * If refresh token successfully => Set new access_token to local storage then tell Tanstack Query to recall api after 1 second
       * If refresh token failed => refresh_token is expired => Logout, clear local storage and clear global state
       */
      retryDelay: 1000
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ToastContainer />
          <App />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
