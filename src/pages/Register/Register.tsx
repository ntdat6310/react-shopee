import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
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
      console.log('dataOnValid', dataOnValid)
    },
    (dataOnInvalid) => {
      console.log(getValues('email'))
    }
  )

  console.log('errors', errors)
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-16 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 bg-white shadow-sm rounded-md' onSubmit={onSubmit}>
              <div className='text-xl lg:text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email'
                  {...register('email', rules.email)}
                  className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
                />
                <div className='mt-1 text-red-700 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  {...register('password', rules.password)}
                  placeholder='Password'
                  className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
                />
                <div className='mt-1 text-red-700 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  {...register('confirm_password', rules.confirm_password)}
                  placeholder='Confirm password'
                  className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
                />
                <div className='mt-1 text-red-700 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
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
