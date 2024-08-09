export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const clearLS = () => {
  localStorage.removeItem('access_token')

  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
