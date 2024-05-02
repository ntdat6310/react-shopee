import { Link } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController'

export default function CartItem() {
  return (
    <div className='grid grid-cols-12 shadow border-[1px] border-gray-200'>
      <div className='col-span-5 py-5'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-start px-3'>
            <input type='checkbox' className='h-5 w-5 accent-orange' />
          </div>
          <Link to={'/'}>
            <div className='flex flex-grow items-center gap-3 mr-3 hover:text-black'>
              <img
                src='https://down-vn.img.susercontent.com/file/54889423ac7db5a649693d35dc620f65'
                alt='Hello'
                className='h-20 w-20 object-cover rounded'
              />
              <div className='line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, beatae molestiae omnis quidem
                cupiditate nisi quibusdam eius officia doloribus nam!
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='col-span-7'>
        <div className='grid grid-cols-10 h-full'>
          <div className='col-span-3'>
            <div className='flex items-center justify-center h-full'>
              <span className='line-through'>₫118.000</span>
              <span className='ml-2 text-black'>₫118.000</span>
            </div>
          </div>
          <div className='col-span-3'>
            <div className='flex items-center justify-center h-full'>
              <QuantityController value={0} setValue={() => null} />
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex items-center justify-center h-full text-orange'>₫118.000</div>
          </div>
          <div className='col-span-2'>
            <div className='flex items-center justify-center h-full'>
              <button className=' text-orange/80 p-3 hover:text-orange'>Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
