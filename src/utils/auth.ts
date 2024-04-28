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
