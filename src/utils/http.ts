import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.types'
import {
  clearAccessTokenFromLocalStorage,
  clearProfileFromLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage
} from './auth'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login) {
          const data = response.data as AuthResponse
          const access_token = data.data.access_token
          this.setAccessToken(access_token)
          setProfileToLocalStorage(data.data.user)
        } else if (url === path.logout) {
          this.clearAccessToken()
          clearProfileFromLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }

  private clearAccessToken = () => {
    this.accessToken = ''
    clearAccessTokenFromLocalStorage()
  }

  private setAccessToken = (access_token: string) => {
    this.accessToken = access_token
    setAccessTokenToLocalStorage(access_token)
  }
}

const http = new Http().instance
export default http
