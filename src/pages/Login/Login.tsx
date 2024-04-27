import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { login } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/types/utils.type'
import { getRules } from 'src/utils/rules'
import { isAxiosError, isAxiosUnprocessableEntityError } from 'src/utils/utils'
interface FormData {
  email: string
  password: string
}
export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const registerUserMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((dataOnValid) => {
    registerUserMutation.mutate(dataOnValid, {
      onSuccess(data) {
        toast(data.data.message)
        reset()
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'server',
                message: formError[key as keyof FormData]
              })
            })
          }
        } else if (isAxiosError<ResponseApi<FormData>>(error)) {
          toast(error.response?.data.message)
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-16 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 bg-white shadow-sm rounded-md' onSubmit={onSubmit}>
              <div className='text-xl lg:text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                rules={rules.email}
                errorMessage={errors.email?.message}
                className='mt-8'
              />
              <Input
                name='password'
                type='password'
                placeholder='Password'
                register={register}
                rules={rules.password}
                errorMessage={errors.password?.message}
                className='mt-2'
              />
              <div className='mt-4'>
                <button
                  type='submit'
                  className='w-full bg-orange hover:opacity-90 uppercase text-white py-4 px-2 rounded-md'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-6 text-center text-sm'>
                <span>Bạn chưa có tài khoản</span>
                <Link to={'/register'} className='text-orange ml-2 font-bold'>
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
