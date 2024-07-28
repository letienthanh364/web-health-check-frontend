import { SuccessRespone } from '../types/common.type'
import { WebsiteContactModel, WebsiteCreate, WebsiteModel, WebsiteUpdate } from '../types/website.type'
import http from '../utils/http'

const url = '/website'

const websiteApi = {
  addWebsite(body: WebsiteCreate) {
    return http.post<SuccessRespone<Number | String>>(url, body)
  },
  listWebsite(params: {}) {
    return http.get<SuccessRespone<WebsiteModel[]>>(url, { params })
  },
  getWebsite(id: number) {
    return http.get<SuccessRespone<WebsiteModel>>(`${url}/${id}`)
  },
  updateWebsite({ id, body }: { id: number; body: WebsiteUpdate }) {
    return http.patch<SuccessRespone<WebsiteModel>>(`${url}/${id}`, body)
  },
  deleteWebsite(id: number) {
    return http.delete<SuccessRespone<WebsiteModel>>(`${url}/${id}`)
  }
}
export default websiteApi

const contactUrl = '/website/contact'
export const websiteContactApi = {
  listContactForWebsite(id: number) {
    return http.get<SuccessRespone<WebsiteContactModel[]>>(`${contactUrl}/${id}`)
  },
  addContactForWebsite({ id, body }: { id: string; body: { contact_address: string; contact_method: string } }) {
    return http.post<SuccessRespone<Number | String>>(`${contactUrl}/${id}`, body)
  }
}
