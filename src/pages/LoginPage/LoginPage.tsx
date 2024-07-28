import { useContext } from 'react'
import { loginSchema, LoginSchema } from '../../utils/rules'
import { AppContext } from '../../contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import authQuery from '../../hooks/queries/useAuthQuery'
import { isAxiosBadRequestError } from '../../utils/utils'
import { ErrorRespone } from '../../types/common.type'
import { HttpStatusMessage } from '../../constants/httpStatusMessage'

type FormData = LoginSchema

export default function LoginPage() {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = authQuery.mutation.useLogin()

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        // getProfileMutation.mutateAsync().then((response) => {
        //   setProfileToLS(response.data.data)
        //   setProfile(response.data.data)
        // })

        navigate(-1)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          if (formError) {
            console.log(formError)
            const errorMessgae = HttpStatusMessage.get(formError.error_key)
            if (errorMessgae) {
              setError('email', {
                message: errorMessgae
              })
              setError('password', {
                message: ''
              })
            }
          }
        }
      }
    })
  })

  return (
    <div className='flex items-center justify-center h-screen bg-darkblue-900'>
      <div className='bg-darkblue-800 p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold mb-6 text-center text-white'>Login</h1>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <label htmlFor='email' className='mb-2 font-semibold text-white'>
            Email:
          </label>
          <input
            type='text'
            id='email'
            placeholder='example@example.com'
            className='p-2 border border-darkblue-600 rounded bg-darkblue-700 text-white'
            {...register('email')}
          />
          <div className='mt-1 uppercase min-h-[1.25rem] text-sm text-red-600 '>{errors.email?.message}</div>

          <label htmlFor='password' className='mb-2 mt-4 font-semibold text-white'>
            Password:
          </label>

          <input
            type='password'
            id='password'
            placeholder='********'
            className='p-2 border border-darkblue-600 rounded bg-darkblue-700 text-white'
            {...register('password')}
          />
          <div className='mt-1 uppercase min-h-[1.25rem] text-sm text-red-600 '>{errors.password?.message}</div>
          <button
            type='submit'
            className='bg-darkblue-600 text-white py-2 px-4 mt-4 rounded hover:bg-darkblue-500 transition-colors'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
