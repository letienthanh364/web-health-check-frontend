import { SQLModel } from '../utils/sql.type'

export interface WebsiteModel extends SQLModel {
  name: string
  path: string
  limit: number
  retry: number
  default_email: string
  status: string
}

export interface WebsiteCreate {
  name: string
  path: string
  limit: number
  retry: number
  default_email: string
}

export interface WebsiteUpdate {
  name?: string
  path?: string
  limit?: number
  retry?: number
  default_email?: string
}

export interface WebsiteContactModel {
  contact_address: string
  contact_method: string
}
