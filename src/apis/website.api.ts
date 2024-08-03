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
  getWebsite(id: string) {
    return http.get<SuccessRespone<WebsiteModel>>(`${url}/${id}`)
  },
  updateWebsite({ id, body }: { id: string; body: WebsiteUpdate }) {
    return http.patch<SuccessRespone<WebsiteModel>>(`${url}/${id}`, body)
  },
  deleteWebsite(id: string) {
    return http.delete<SuccessRespone<WebsiteModel>>(`${url}/${id}`)
  }
}
export default websiteApi

const contactUrl = '/website/contact'
export const websiteContactApi = {
  listContactForWebsite(id: string) {
    return http.get<SuccessRespone<WebsiteContactModel[]>>(`${contactUrl}/${id}`)
  },
  addContactForWebsite({ id, body }: { id: string; body: { contact_address: string; contact_method: string } }) {
    return http.post<SuccessRespone<Number | String>>(`${contactUrl}/${id}`, body)
  }
}
