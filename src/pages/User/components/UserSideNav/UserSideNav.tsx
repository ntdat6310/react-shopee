import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function UserSideNav() {
  return (
    <div className=''>
      <div className='flex items-center py-2 border-b border-b-gray-200'>
        <Link to={path.profile} className='rounded-full w-11 h-11 flex-shrink-0 overflow-hidden'>
          <img
            src='https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg'
            alt='user_profile'
            className='rounded-full object-cover'
          />
        </Link>
        <div className='flex flex-col pl-2 flex-grow'>
          <div className='truncate max-w-32 md:max-w-24 font-semibold text-black'>
            changkho610310changkho6310changkho6310changkho6310changkho63
          </div>
          <div className='capitalize flex items-center py-1 gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-3 h-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
              />
            </svg>
            <Link to={path.profile} className='hover:text-orange'>
              Sửa hồ sơ
            </Link>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
            />
          </svg>
          <div className='capitalize pl-2'>Tài khoản của tôi</div>
        </div>
        <div className='mt-2'>
          <Link to={path.profile} className='pl-10 capitalize hover:text-orange'>
            Hồ sơ
          </Link>
        </div>
        <div className='mt-2'>
          <Link to={path.changePassword} className='pl-10 capitalize hover:text-orange'>
            Đổi mật khẩu
          </Link>
        </div>
      </div>

      <div className='mt-4 mb-2 flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z'
          />
        </svg>
        <Link to={path.historyPurchase} className='capitalize px-2 hover:text-orange'>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}
