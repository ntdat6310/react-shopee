import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-16 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 bg-white shadow-sm rounded-md'>
              <div className='text-xl lg:text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
                />
                <div className='mt-1 text-red-700 min-h-[1rem] text-sm'>Email không hợp lệ</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
                />
                <div className='mt-1 text-red-700 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  name='confirm_password'
                  placeholder='Confirm password'
                  className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
                />
                <div className='mt-1 text-red-700 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-4'>
                <button className='w-full bg-orange hover:opacity-90 uppercase text-white py-4 px-2 rounded-md'>
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
