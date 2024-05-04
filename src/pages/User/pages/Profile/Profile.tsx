import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useMutation } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import userApi, { BodyUpdateProfile } from 'src/apis/user.api'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { setProfileToLocalStorage } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import DateSelect from '../../components/DateSelect'
import { config } from 'src/constants/path'
import { toast } from 'react-toastify'

type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'date_of_birth' | 'phone'>
const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'date_of_birth', 'phone'])

type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}
const MySwal = withReactContent(Swal)

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { profile, setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewAvatar = useMemo(() => {
    return file && URL.createObjectURL(file)
  }, [file])

  const profileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.updateAvatar
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema)
  })
  useEffect(() => {
    setValue('address', profile?.address)
    setValue('avatar', profile?.avatar)
    setValue('date_of_birth', profile?.date_of_birth ? new Date(profile?.date_of_birth) : new Date(1990, 0, 1))
    setValue('name', profile?.name)
    setValue('phone', profile?.phone)
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (dataOnValid) => {
    let newAvatarName
    try {
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadResponse = await uploadAvatarMutation.mutateAsync(form)
        newAvatarName = uploadResponse.data.data
      }

      const updateProfileResponse = await profileMutation.mutateAsync(
        omitBy(
          {
            ...dataOnValid,
            date_of_birth: dataOnValid.date_of_birth?.toISOString(),
            avatar: newAvatarName ?? dataOnValid.avatar
          },
          isUndefined
        ) as BodyUpdateProfile
      )

      MySwal.fire({
        icon: 'success',
        text: updateProfileResponse.data.message,
        timer: 2000
      })

      setProfile(updateProfileResponse.data.data)
      setProfileToLocalStorage(updateProfileResponse.data.data)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
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

  const handleDateChange = (value: Date) => {
    setValue('date_of_birth', value)
  }

  const onAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    console.log(fileFromLocal)
    if (
      fileFromLocal?.size &&
      (fileFromLocal?.size >= config.maxSizeAvatarUpload || !fileFromLocal.type.includes('images/'))
    ) {
      toast.error('File ảnh phải có dung lương tối đa 1MB')
    } else {
      setFile(fileFromLocal)
    }
  }

  const onClickButtonSelectAvatar = () => {
    fileInputRef.current?.click()
  }
  return (
    <div className='bg-white rounded-md py-4 px-6'>
      <h1 className='capitalize text-lg font-semibold text-black'>Hồ sơ của tôi</h1>
      <div className='mt-2'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      <div className='my-4 h-[1px] w-full bg-gray-200'></div>
      <form action='' onSubmit={onSubmit}>
        <div className='grid grid-cols-12 gap-4'>
          <div className='mt-4 col-span-12 lg:col-span-8 items-center'>
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2'>Email</div>
              <div className='col-span-12 sm:col-span-8 pl-2'> {profile?.email} </div>
            </div>

            <div className='mt-6 grid grid-cols-12 items-start gap-2'>
              <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2 sm:pt-2'>Họ Tên</div>
              <div className='col-span-12 sm:col-span-8'>
                <Input
                  name='name'
                  register={register}
                  isErrorPossible={true}
                  errorMessage={errors.name?.message}
                  placeholder='Nhập họ tên'
                  classNameInput='outline-none border border-gray-400 py-2 px-2 w-full rounded-md focus:border-black'
                />
              </div>
            </div>

            <div className='mt-2 grid grid-cols-12 items-start gap-2'>
              <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2 sm:pt-2'>Số điện thoại</div>
              <div className='col-span-12 sm:col-span-8'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder='Nhập số điện thoại'
                        isErrorPossible={true}
                        errorMessage={errors.phone?.message}
                        classNameInput='outline-none border border-gray-400 py-2 px-2 w-full rounded-md focus:border-black'
                      />
                    )
                  }}
                />
              </div>
            </div>

            <div className='mt-2 grid grid-cols-12 items-start gap-2'>
              <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2 sm:pt-2'>Địa chỉ</div>
              <div className='col-span-12 sm:col-span-8'>
                <Input
                  register={register}
                  name='address'
                  isErrorPossible={true}
                  errorMessage={errors.address?.message}
                  placeholder='Nhập địa chỉ'
                  classNameInput='outline-none border border-gray-400 py-2 px-2 w-full rounded-md focus:border-black'
                />
              </div>
            </div>

            <div className='mt-2 grid grid-cols-12 items-start gap-2'>
              <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2 sm:pt-2'>Ngày sinh</div>
              <div className='col-span-12 sm:col-span-8'>
                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => {
                    return (
                      <DateSelect
                        value={field.value}
                        onChange={handleDateChange}
                        isErrorPossible={true}
                        errorMessage={errors.date_of_birth?.message}
                      />
                    )
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-4'>
            <div className='flex flex-col items-center gap-3'>
              <div className='h-32 w-32 rounded-full flex items-center'>
                <img
                  src={previewAvatar || getAvatarUrl(profile?.avatar)}
                  alt='user_profile'
                  className='rounded-full object-cover w-full h-full'
                />
              </div>
              <input
                type='file'
                className='hidden'
                ref={fileInputRef}
                accept='.ipg,.jpeg,.png'
                onChange={onAvatarChange}
              />
              <button
                type='button'
                onClick={onClickButtonSelectAvatar}
                className='py-2 px-3 capitalize border border-gray-400 rounded-md hover:bg-gray-100'
              >
                Chọn ảnh
              </button>
              <div className=''>
                <p>Dụng lượng file tối đa 1 MB</p>
                <p>Phải là định dạng ảnh </p>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-12 md:gap-4'>
          <button
            type='submit'
            className='col-span-5 col-start-8 sm:col-span-4 sm:col-start-9 lg:col-span-3 lg:col-start-6 xl:col-span-2 xl:col-start-7 py-2 bg-orange text-white rounded-md hover:bg-orange/90'
          >
            Lưu lại
          </button>
        </div>
      </form>
    </div>
  )
}
