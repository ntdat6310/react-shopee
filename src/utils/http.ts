import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import path, { config } from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import { SuccessResponse } from 'src/types/utils.type'
import {
  clearLS,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage
} from './auth'
class Http {
  instance: AxiosInstance
  private accessToken: string
  private isRefreshedAccessToken: boolean
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.isRefreshedAccessToken = false
    this.instance = axios.create({
      baseURL: config.baseUrl,
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
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login) {
          const data = response.data as AuthResponse
          setProfileToLocalStorage(data.data.user)
          const access_token = data.data.access_token
          const refresh_token = data.data.refresh_token
          this.setAccessToken(access_token)
          this.setRefreshToken(refresh_token)
        } else if (url === path.logout) {
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          if (!this.isRefreshedAccessToken) {
            this.refreshAccessToken()
            this.isRefreshedAccessToken = true
          } else {
            clearLS()
          }
        } else if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error?.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }

  private setAccessToken = (access_token: string) => {
    this.accessToken = access_token
    setAccessTokenToLocalStorage(access_token)
  }

  private setRefreshToken = (refresh_token: string) => {
    setRefreshTokenToLocalStorage(refresh_token)
  }

  private refreshAccessToken = () => {
    const refresh_token = getRefreshTokenFromLocalStorage()
    this.instance
      .post<SuccessResponse<{ access_token: string }>>('/refresh-access-token', {
        refresh_token: refresh_token
      })
      .then((data) => {
        this.setAccessToken(data.data.data.access_token)
      })
  }
}

const http = new Http().instance
export default http
