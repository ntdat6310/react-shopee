import Popover from '../Popover'

export default function UserDropdownMenu() {
  return (
    <Popover
      renderPopover={
        <div className='bg-white flex flex-col shadow-md items-start text-gray-600 text-[20px] '>
          <button className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all'>Tài khoản của tôi</button>
          <button className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all'>Đơn mua</button>
          <button className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all'>Đăng xuất</button>
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
