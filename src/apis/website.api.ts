import { SuccessRespone } from '../types/common.type'
import {
  WebsiteChecktimeModel,
  WebsiteContactModel,
  WebsiteCreate,
  WebsiteModel,
  WebsiteUpdate
} from '../types/website.type'
import http from '../utils/http'

const url = '/website'

const websiteApi = {
  addWebsite(body: WebsiteCreate) {
    return http.post<SuccessRespone<number | string>>(url, body)
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
    return http.delete<SuccessRespone<string>>(`${url}/${id}`)
  }
}
export default websiteApi

const contactUrl = '/website/contact'
export const websiteContactApi = {
  listContactForWebsite(id: string) {
    return http.get<SuccessRespone<WebsiteContactModel[]>>(`${contactUrl}/${id}`)
  },
  addContactForWebsite({ id, body }: { id: string; body: { address: string; contact_method: string } }) {
    return http.post<SuccessRespone<number | string>>(`${contactUrl}/${id}`, body)
  },
  removeContactForWebsite({ id, body }: { id: string; body: { id: number } }) {
    return http.delete<SuccessRespone<string>>(`${contactUrl}/${id}`, { data: body })
  }
}

const checktimeUrl = '/website/check-time'
export const websiteChecktimeApi = {
  listChecktimeForWebsite(id: string) {
    return http.get<SuccessRespone<WebsiteChecktimeModel[]>>(`${checktimeUrl}/${id}`)
  },
  addChecktimeForWebsite({ id, body }: { id: string; body: { check_time: string } }) {
    return http.post<SuccessRespone<number | string>>(`${checktimeUrl}/${id}`, body)
  },
  removeChecktimeForWebsite({ id, body }: { id: string; body: { id: number } }) {
    return http.delete<SuccessRespone<string>>(`${checktimeUrl}/${id}`, { data: body })
  }
}
