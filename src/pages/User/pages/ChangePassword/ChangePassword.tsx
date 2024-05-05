import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import ShowPassword from '../../components/ShowPassword'
import HidePassword from '../../components/HidePassword'

const schema = userSchema.pick(['password', 'confirm_password', 'new_password'])
type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
interface ShowHidePassword {
  password: boolean
  new_password: boolean
  confirm_password: boolean
}

export default function ChangePassword() {
  const [isShow, setIsShow] = useState<ShowHidePassword>({
    password: false,
    new_password: false,
    confirm_password: false
  })

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const changePasswordMutation = useMutation({
    mutationFn: userApi.changePassword
  })

  const onSubmit = handleSubmit((dataOnValid) => {
    changePasswordMutation.mutate(
      { password: dataOnValid.password, new_password: dataOnValid.new_password },
      {
        onSuccess() {
          toast.success('Đổi mật khẩu thành công', { autoClose: 1000 })
          reset()
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
      }
    )
  })

  const handleIsShow =
    <K extends keyof ShowHidePassword>(key: K) =>
    () => {
      setIsShow((prev) => {
        return { ...prev, [key]: !prev[key] }
      })
    }

  console.log(isShow)
  return (
    <div className='mt-4 py-8 px-4 sm:px-8 min-h-[400px] bg-white rounded-md text-gray-500'>
      <h1 className='text-black text-xl capitalize'>Đổi mật khẩu</h1>
      <p className='mt-2'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      <div className='bg-gray-200 h-[1px] mt-4 mb-6'></div>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <div className='grid grid-cols-12 gap-2 mt-1'>
          <div className='col-span-12 sm:col-span-3 flex mt-2 sm:justify-end'>Mật khẩu</div>
          <div className='col-span-12 sm:col-span-9 lg:col-span-8 2xl:col-span-6'>
            <div className='border-gray-300 border rounded-md flex'>
              <input
                {...register('password')}
                name='password'
                type={isShow.password ? 'text' : 'password'}
                className='py-2 pl-3 flex-grow outline-none rounded-md'
                placeholder='Mật khẩu'
              />
              <button type='button' className='px-3' onClick={handleIsShow('password')}>
                {isShow.password ? <HidePassword /> : <ShowPassword />}
              </button>
            </div>
            <div className='mt-[2px] ml-3 text-red min-h-[1.25rem] text-xs'>{errors.password?.message}</div>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-2 mt-1'>
          <div className='col-span-12 sm:col-span-3 flex mt-2 sm:justify-end'>Mật khẩu mới</div>
          <div className='col-span-12 sm:col-span-9 lg:col-span-8 2xl:col-span-6'>
            <div className='border-gray-300 border rounded-md flex'>
              <input
                {...register('new_password')}
                name='new_password'
                type={isShow.new_password ? 'text' : 'password'}
                className='py-2 pl-3 flex-grow outline-none rounded-md'
                placeholder='Mật khẩu mới'
              />
              <button type='button' className='px-3' onClick={handleIsShow('new_password')}>
                {isShow.new_password ? <HidePassword /> : <ShowPassword />}
              </button>
            </div>
            <div className='mt-[2px] ml-3 text-red min-h-[1.25rem] text-xs'>{errors.new_password?.message}</div>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-2 mt-1'>
          <div className='col-span-12 sm:col-span-3 flex mt-2 sm:justify-end'>Nhập lại</div>
          <div className='col-span-12 sm:col-span-9 lg:col-span-8 2xl:col-span-6'>
            <div className='border-gray-300 border rounded-md flex'>
              <input
                {...register('confirm_password')}
                type={isShow.confirm_password ? 'text' : 'password'}
                className='py-2 pl-3 flex-grow outline-none rounded-md'
                placeholder='Nhập lại'
              />
              <button type='button' className='px-3' onClick={handleIsShow('confirm_password')}>
                {isShow.confirm_password ? <HidePassword /> : <ShowPassword />}
              </button>
            </div>
            <div className='mt-[2px] ml-3 text-red min-h-[1.25rem] text-xs'>{errors.confirm_password?.message}</div>
          </div>
        </div>

        <div className='grid grid-cols-12'>
          <button
            type='submit'
            className='mt-2 py-2 col-span-12 sm:col-span-3 sm:col-start-4 rounded-md bg-orange text-white'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
