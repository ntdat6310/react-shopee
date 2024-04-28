import { SetStateAction, createContext, useState } from 'react'
import { getAccessTokenFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface Props {
  children: React.ReactNode
}
export const AppProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>
}
