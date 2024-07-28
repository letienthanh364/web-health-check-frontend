import http from '../utils/http'

const url = '/check-link'

const checkerApi = {
  checkLink(link: string) {
    return http.post<{ status: string }>(url, { URL: link })
  }
}

export default checkerApi
