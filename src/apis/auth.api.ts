import { AuthRespone } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string; name: string; phone: string }) {
    return http.post<AuthRespone>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthRespone>('/login', body)
  }
}

export default authApi
