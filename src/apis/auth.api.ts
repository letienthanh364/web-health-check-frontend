import { AuthRespone } from '../types/auth.type'
import { SuccessRespone } from '../types/common.type'
import { User } from '../types/user.type'
import { clearLS, getAccessTokenFromLS } from '../utils/auth'
import http from '../utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string; name: string; phone: string }) {
    return http.post<AuthRespone>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthRespone>('/login', body)
  },
  logout() {
    clearLS()
  },
  getProfile() {
    const token = getAccessTokenFromLS()
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    return http.get<SuccessRespone<User>>(`/profile`, { headers })
  }
}

export default authApi
