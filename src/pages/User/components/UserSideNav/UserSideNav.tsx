import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className=''>
      <div className='flex items-center py-2 border-b border-b-gray-200'>
        <Link to={path.profile} className='rounded-full w-11 h-11 flex-shrink-0 overflow-hidden'>
          <img
            src={getAvatarUrl(profile?.avatar)}
            alt='user_profile'
            className='rounded-full object-cover w-full h-full'
          />
        </Link>
        <div className='flex flex-col pl-2 flex-grow'>
          <div className='truncate max-w-32 md:max-w-24 font-semibold text-black'>{profile?.name}</div>
        </div>
      </div>

      <div className='mt-6'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center gap-2 capitalize hover:text-orange', {
              'text-orange': isActive
            })
          }
        >
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
          <div>Hồ sơ của tôi</div>
        </NavLink>
      </div>

      <div className='mt-4'>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('flex items-center gap-2 capitalize hover:text-orange', {
              'text-orange': isActive
            })
          }
        >
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
              d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
            />
          </svg>

          <div>Đổi mật khẩu</div>
        </NavLink>
      </div>

      <div className='mt-4'>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('flex items-center gap-2 capitalize hover:text-orange', {
              'text-orange': isActive
            })
          }
        >
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

          <div>Đơn mua</div>
        </NavLink>
      </div>
    </div>
  )
}
