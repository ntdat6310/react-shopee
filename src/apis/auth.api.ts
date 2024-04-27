import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

export const registerAccount = function (body: { email: string; password: string }) {
  return http.post<AuthResponse>('/register', body)
}

export const login = function (body: { email: string; password: string }) {
  return http.post<AuthResponse>('/login', body)
}
