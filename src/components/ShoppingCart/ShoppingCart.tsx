import { Link } from 'react-router-dom'
import Popover from '../Popover'
interface Props {
  classNames?: string
}
export default function ShoppingCart({ classNames = '' }: Props) {
  return (
    <Popover
      childrenClasses={classNames}
      renderPopover={
        <div className='bg-white shadow-md text-gray-600 max-w-[350px] md:max-w-[400px] lg:max-w-[500px] text-sm'>
          <div className='p-4 capitalize text-gray-400'>Sản phẩm mới thêm</div>
          <Link to='/'>
            <div className='py-2 px-4 hover:bg-gray-200 flex items-center gap-2'>
              <div className='flex-shrink-0'>
                <img
                  src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lulisemxa80ieb_tn'
                  alt='image_product'
                  className='w-10 h-10 object-cover rounded-sm'
                />
              </div>
              <div className='flex-grow overflow-hidden'>
                <div className='truncate'>Sữa bột Pediasure 850g hương vani</div>
              </div>
              <div className='flex-shrink-0'>
                <div className='text-[#d0011b]'>₫645.000</div>
              </div>
            </div>
          </Link>
          <Link to='/'>
            <div className='py-2 px-4 hover:bg-gray-200 flex items-center gap-2'>
              <div className='flex-shrink-0'>
                <img
                  src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lia0palxqkuk92_tn'
                  alt='image_product'
                  className='w-10 h-10 object-cover rounded-sm'
                />
              </div>
              <div className='flex-grow overflow-hidden'>
                <div className='truncate'>
                  Phô mai tách muối hữu cơ DONGWON-DENMARK cho bé ăn dặm từ 6 tháng - FORBEE
                </div>
              </div>
              <div className='flex-shrink-0'>
                <div className='text-[#d0011b]'>₫135.000</div>
              </div>
            </div>
          </Link>
          <Link to='/'>
            <div className='py-2 px-4 hover:bg-gray-200 flex items-center gap-2'>
              <div className='flex-shrink-0'>
                <img
                  src='https://down-vn.img.susercontent.com/file/4060137ccc9fe939182353ed15980853_tn'
                  alt='image_product'
                  className='w-10 h-10 object-cover rounded-sm'
                />
              </div>
              <div className='flex-grow overflow-hidden'>
                <div className='truncate'>
                  Gia vị rắc cơm nội địa Nhật cho bé ăn dặm 6 vị gồm 30 gói nhỏ (date 12/2024)
                </div>
              </div>
              <div className='flex-shrink-0'>
                <div className='text-[#d0011b]'>₫53.000</div>
              </div>
            </div>
          </Link>
          <button className='mt-4 py-2 px-4 w-full text-center bg-orange hover:bg-opacity-90 transition-all text-white capitalize'>
            Xem giỏ hàng
          </button>
        </div>
      }
    >
      <div className='flex items-center justify-center text-white w-full h-full'>
        <Link to='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 sm:w-9 sm:h-9 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
            />
          </svg>
        </Link>
      </div>
    </Popover>
  )
}
