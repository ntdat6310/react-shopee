export default function ChangePassword() {
  return (
    <div className='mt-4 py-8 px-4 sm:px-8 min-h-[400px] bg-white rounded-md text-gray-500'>
      <h1 className='text-black text-xl capitalize'>Đổi mật khẩu</h1>
      <p className='mt-2'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      <div className='bg-gray-200 h-[1px] mt-4 mb-6'></div>
      <form className='flex flex-col gap-6 sm:gap-4'>
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-12 sm:col-span-3 flex items-center sm:justify-end'>Mật khẩu</div>
          <div className='col-span-12 sm:col-span-9 lg:col-span-8 2xl:col-span-6 border-gray-300 border rounded-md flex'>
            <input type='text' className='py-2 pl-3 flex-grow outline-none rounded-md' placeholder='Mật khẩu' />
            <button type='button' className='px-3'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                <path
                  fillRule='evenodd'
                  d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-12 sm:col-span-3 flex items-center sm:justify-end'>Mật khẩu mới</div>
          <div className='col-span-12 sm:col-span-9 lg:col-span-8 2xl:col-span-6 border-gray-300 border rounded-md flex'>
            <input type='text' className='py-2 pl-3 flex-grow outline-none rounded-md' placeholder='Mật khẩu mới' />
            <button type='button' className='px-3'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                <path
                  fillRule='evenodd'
                  d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-12 sm:col-span-3 flex items-center sm:justify-end'>Nhập lại</div>
          <div className='col-span-12 sm:col-span-9 lg:col-span-8 2xl:col-span-6 border-gray-300 border rounded-md flex'>
            <input type='text' className='py-2 pl-3 flex-grow outline-none rounded-md' placeholder='Nhập lại' />
            <button type='button' className='px-3'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                <path d='M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z' />
                <path d='M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z' />
                <path d='M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z' />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
