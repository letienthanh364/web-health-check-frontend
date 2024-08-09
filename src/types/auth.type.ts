import { SuccessRespone } from './common.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  expires: string
}>
