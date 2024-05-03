export default function Profile() {
  return (
    <div className='bg-white rounded-md py-4 px-6'>
      <h1 className='capitalize text-lg font-semibold text-black'>Hồ sơ của tôi</h1>
      <div className='mt-2'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      <div className='my-4 h-[1px] w-full bg-gray-200'></div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='mt-4 col-span-12 lg:col-span-8 items-center'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2'>Email</div>
            <div className='col-span-12 sm:col-span-8'>changkho6310@gmail.com</div>
          </div>

          <div className='mt-4 grid grid-cols-12 items-center gap-2'>
            <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2'>Họ Tên</div>
            <div className='col-span-12 sm:col-span-8'>
              <input
                type='text'
                className='outline-none border border-gray-400 py-2 px-2 w-full rounded-md focus:border-black'
              />
            </div>
          </div>

          <div className='mt-4 grid grid-cols-12 items-center gap-2'>
            <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2'>Số điện thoại</div>
            <div className='col-span-12 sm:col-span-8'>
              <input
                type='text'
                className='outline-none border-gray-400 border py-2 px-2 w-full rounded-md focus:border-black'
              />
            </div>
          </div>

          <div className='mt-4 grid grid-cols-12 items-center gap-2'>
            <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2'>Địa chỉ</div>
            <div className='col-span-12 sm:col-span-8'>
              <input
                type='text'
                className='outline-none border-gray-400 border py-2 px-2 w-full rounded-md focus:border-black'
              />
            </div>
          </div>

          <div className='mt-4 grid grid-cols-12 items-center gap-2'>
            <div className='col-span-12 sm:col-span-4 text-left sm:text-right sm:pr-2'>Ngày sinh</div>
            <div className='col-span-12 sm:col-span-8'>
              <div className='grid grid-cols-3 gap-2'>
                <select
                  name=''
                  id=''
                  className='col-span-1 py-2 border border-gray-400 rounded-md text-center outline-none focus:border-black'
                >
                  <option value=''>Ngày</option>
                </select>
                <select
                  name=''
                  id=''
                  className='col-span-1 py-2 border border-gray-400 rounded-md text-center outline-none focus:border-black'
                >
                  <option value=''>Tháng</option>
                </select>
                <select
                  name=''
                  id=''
                  className='col-span-1 py-2 border border-gray-400 rounded-md text-center outline-none focus:border-black'
                >
                  <option value=''>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <div className='flex flex-col items-center gap-3'>
            <div className='h-32 w-32 rounded-full flex items-center'>
              <img
                src='https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg'
                alt='user_profile'
                className='rounded-full object-cover w-full h-full'
              />
            </div>
            <input type='text' className='hidden' />
            <button className='py-2 px-3 capitalize border border-gray-400 rounded-md hover:bg-gray-100'>
              Chọn ảnh
            </button>
            <div className=''>
              <p>Dụng lượng file tối đa 1 MB</p>
              <p>Định dạng:.JPEG, .PNG </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
