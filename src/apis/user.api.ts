import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {}
export interface ChangePassword {
  password: string
  new_password: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },

  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('/user', body)
  },

  changePassword(body: ChangePassword) {
    return http.put<SuccessResponse<User>>('/user', body)
  },

  updateAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-datas'
      }
    })
  }
}
export default userApi