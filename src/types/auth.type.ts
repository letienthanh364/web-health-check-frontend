import { SuccessRespone } from './common.type'
import { User } from './user.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  expires: string
}>

export type ProfileRespone = {
  data: User
}
