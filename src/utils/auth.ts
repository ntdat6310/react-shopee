import { User } from 'src/types/user.type'

export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const setRefreshTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('refresh_token', access_token)
}

export const clearRefreshTokenFromLocalStorage = () => {
  localStorage.removeItem('refresh_token')
}

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  const profile: User | null = result ? JSON.parse(result) : null
  return profile
}

export const setProfileToLocalStorage = (profile: User | null) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearProfileFromLocalStorage = () => {
  localStorage.removeItem('profile')
}

export const LocalStorageEventTarget = new EventTarget()

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')

  /** Dispatch event when refresh token is expired
   *  We need global state: isAuthenticated will be false and profile will be null)
   * So I dispatch and listen this event in App
   */
  const clearLocalStorageEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}
