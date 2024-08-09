import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'

const useLogin = () => {
  return useMutation({
    mutationFn: authApi.loginAccount
  })
}

const authQuery = {
  mutation: {
    useLogin
  }
}

export default authQuery
