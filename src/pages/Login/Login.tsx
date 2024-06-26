import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { login } from 'src/apis/auth.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { RegisterSchema, registerSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Omit<RegisterSchema, 'confirm_password'>
const loginSchema = registerSchema.omit(['confirm_password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((dataOnValid) => {
    loginMutation.mutate(dataOnValid, {
      onSuccess(data) {
        reset()
        setProfile(data.data.data.user)
        toast.success(data.data.message, {
          autoClose: 500
        })
        setTimeout(() => {
          setIsAuthenticated(true)
        }, 1000)
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'server',
                message: formError[key as keyof FormData]
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-16 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-6 md:p-10 bg-white shadow-sm rounded-md' onSubmit={onSubmit} noValidate>
              <div className='text-xl lg:text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
                className='mt-8'
              />
              <Input
                name='password'
                type='password'
                placeholder='Password'
                register={register}
                errorMessage={errors.password?.message}
                className='mt-2'
              />
              <div className='mt-4'>
                <Button
                  type='submit'
                  className='w-full bg-orange hover:opacity-90 uppercase text-white py-4 px-2 rounded-md flex items-center justify-center gap-2'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-6 text-center text-sm'>
                <span>Bạn chưa có tài khoản</span>
                <Link to={path.register} className='text-orange ml-2 font-bold'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
