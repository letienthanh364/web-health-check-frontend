import * as yup from 'yup'

const handleEmailYup = () => {
  return yup
    .string()
    .required('Email address is required')
    .email('Incorrect email format')
    .min(5, 'Email address must have at least 5 characters')
    .max(160, 'Email address can only have a total length of 160 characters')
}

const handlePasswordYup = () => {
  return yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be 8-16 characters')
    .max(16, 'Password must be 8-16 characters')
}
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm Password is required')
    .min(8, 'Password must be 8-16 characters')
    .max(16, 'Password must be 8-16 characters')
    .oneOf([yup.ref(refString)], 'Passwords do not match')
}

export const registerSchema = yup.object({
  email: handleEmailYup(),
  password: handlePasswordYup(),
  confirm_password: handleConfirmPasswordYup('password'),
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required')
})
export type RegisterSchema = yup.InferType<typeof registerSchema>

export const changePasswordSchema = yup.object({
  old_password: yup.string().default(''),
  new_password: handlePasswordYup(),
  confirm_new_password: handleConfirmPasswordYup('new_password')
})
export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export const loginSchema = yup.object({
  email: handleEmailYup(),
  password: yup.string().required('Password is required')
})
export type LoginSchema = yup.InferType<typeof loginSchema>
