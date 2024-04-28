import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { logout } from 'src/apis/auth.api'
import Popover from '../Popover'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'

export default function UserDropdownMenu() {
  const { setIsAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: logout,
    onSuccess(data) {
      toast.success(data.data.message, {
        autoClose: 500
      })
      setTimeout(() => {
        // window.location.reload()
        setIsAuthenticated(false)
      }, 800)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <Popover
      renderPopover={
        <div className='bg-white flex flex-col shadow-md items-start text-gray-600 text-[20px] '>
          <Link to={path.profile}>
            <div className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all'>Tài khoản của tôi</div>
          </Link>
          <button className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all'>Đơn mua</button>
          <button className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all' onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      }
    >
      <div className='ml-5 flex items-center text-white hover:text-gray-300 cursor-pointer'>
        <div className='w-7 h-7 flex-shrink-0'>
          <img
            src='https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg'
            alt='avatar'
            className='w-full h-full rounded-full object-cover'
          />
        </div>
        <div className='ml-2'>Ronaldo</div>
      </div>
    </Popover>
  )
}
