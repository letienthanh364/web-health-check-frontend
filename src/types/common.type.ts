export interface CustomImage {
  imgUrl: string
  alt: string
}

export interface ErrorRespone {
  status_code: number
  message: string
  log: string
  error_key: string
}

export interface SuccessRespone<Data> {
  data: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
