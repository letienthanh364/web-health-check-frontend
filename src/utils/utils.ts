import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import parser from 'cron-parser'
import { ErrorRespone } from '../types/common.type'
import { HttpStatusMessage } from '../constants/httpStatusMessage'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosUnprocessableError(error: unknown) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i:${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i:')
  return arr[arr.length - 1]
}

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, time?: number) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, time || 1500)
}

export function truncateString(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '&hellip;' : str
}

export const parseCronToTime = (cronString: string): string => {
  try {
    const interval = parser.parseExpression(cronString)
    const nextDate = interval.next().toDate()
    const hours = nextDate.getHours().toString().padStart(2, '0')
    const minutes = nextDate.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes} every day`
  } catch (err) {
    console.error('Invalid cron string', err)
    return 'Invalid cron string'
  }
}

export const handleErrorResponse = (err: any, setErrMessage: React.Dispatch<React.SetStateAction<string>>) => {
  if (isAxiosBadRequestError<ErrorRespone>(err)) {
    const formError = err.response?.data
    if (formError) {
      const errorMessgae = HttpStatusMessage.get(formError.error_key)
      setErrMessage(errorMessgae || 'Undefined Error')
      return
    }
  }
}
