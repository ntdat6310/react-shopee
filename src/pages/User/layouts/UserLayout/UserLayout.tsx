import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='bg-gray-100 py-8 text-sm text-gray-500 border-b-4 border-orange'>
      <div className='max-w-7xl mx-auto px-4 md:px-2 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-2'>
          <div className='col-span-1 md:col-span-3 xl:col-span-2'>
            <UserSideNav />
          </div>
          <div className='col-span-1 md:col-span-9 xl:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
