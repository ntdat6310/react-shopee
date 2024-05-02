import { AuthResponse } from 'src/types/auth.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_LOGIN = '/login'
const URL_REGISTER = '/register'
const URL_LOGOUT = '/logout'

export const registerAccount = function (body: { email: string; password: string }) {
  return http.post<AuthResponse>(URL_REGISTER, body)
}

export const login = function (body: { email: string; password: string }) {
  return http.post<AuthResponse>(URL_LOGIN, body)
}

export const logout = function () {
  return http.post<SuccessResponse<{ message: string }>>(URL_LOGOUT)
}
