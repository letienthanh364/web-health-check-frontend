import { SuccessRespone } from '../types/common.type'
import http from '../utils/http'
const url = '/contact'

const contactApi = {
  deleteContact(id: string) {
    return http.delete<SuccessRespone<String>>(`${url}/${id}`)
  }
}

export default contactApi
