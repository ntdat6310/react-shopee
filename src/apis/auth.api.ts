import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.types'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const registerAccount = function (body: { email: string; password: string }) {
  return http.post<AuthResponse>(path.register, body)
}

export const login = function (body: { email: string; password: string }) {
  return http.post<AuthResponse>(path.login, body)
}

export const logout = function () {
  return http.post<SuccessResponse<{ message: string }>>(path.logout)
}
