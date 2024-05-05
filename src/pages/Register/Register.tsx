import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { registerAccount } from 'src/apis/auth.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { ErrorResponse } from 'src/types/utils.type'
import { RegisterSchema, registerSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema)
  })

  const registerUserMutation = useMutation({
    mutationFn: (body: Omit<RegisterSchema, 'confirm_password'>) => registerAccount(body)
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((dataOnValid) => {
    registerUserMutation.mutate(_.omit(dataOnValid, ['confirm_password']), {
      onSuccess(data) {
        reset()
        toast.success(data.data.message, {
          autoClose: 500
        })
        setTimeout(() => {
          navigate(path.login)
        }, 1000)
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<RegisterSchema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<RegisterSchema, 'confirm_password'>, {
                type: 'server',
                message: formError[key as keyof Omit<RegisterSchema, 'confirm_password'>]
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
              <div className='text-xl lg:text-2xl'>Đăng ký</div>
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
              <Input
                name='confirm_password'
                type='password'
                placeholder='Confirm password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                className='mt-2'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  className='w-full bg-orange hover:opacity-90 uppercase text-white py-4 px-2 rounded-md flex items-center justify-center gap-2'
                  isLoading={registerUserMutation.isPending}
                  disabled={registerUserMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-6 text-center text-sm'>
                <span>Bạn đã có tài khoản</span>
                <Link to={path.login} className='text-orange ml-2 font-bold'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
