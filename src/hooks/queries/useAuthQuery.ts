import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'

const useLogin = () => {
  return useMutation({
    mutationFn: authApi.loginAccount
  })
}

const useGetProfile = () => {
  return useMutation({
    mutationFn: authApi.getProfile
  })
}

const authQuery = {
  mutation: {
    useLogin,
    useGetProfile
  }
}

export default authQuery
