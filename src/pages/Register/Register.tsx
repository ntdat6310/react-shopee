import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (dataOnValid) => {
      console.log(dataOnValid)
    },
    (dataOnInvalid) => {
      console.log(dataOnInvalid)
    }
  )

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-16 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 bg-white shadow-sm rounded-md' onSubmit={onSubmit}>
              <div className='text-xl lg:text-2xl'>Đăng ký</div>
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
              <Input
                name='confirm_password'
                type='password'
                placeholder='Confirm password'
                register={register}
                rules={rules.confirm_password}
                errorMessage={errors.confirm_password?.message}
                className='mt-2'
              />
              <div className='mt-2'>
                <button
                  className='w-full bg-orange hover:opacity-90 uppercase text-white py-4 px-2 rounded-md'
                  type='submit'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-6 text-center text-sm'>
                <span>Bạn đã có tài khoản</span>
                <Link to={'/login'} className='text-orange ml-2 font-bold'>
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
