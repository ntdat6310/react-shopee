import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

export const registerAccount = function (body: { email: string; password: string }) {
  console.log('body', body)
  return http.post<AuthResponse>('/register', body)
}
