import { Link } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import StarList from 'src/components/StarList'
import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div>
      <div className='flex items-center gap-2'>
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
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
          />
        </svg>
        <div className='font-bold capitalize'>Tất cả danh mục</div>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pl-5 flex flex-col gap-3 text-sm'>
        <Link to={path.home} className='capitalize'>
          Thời trang nam
        </Link>
        <Link to={path.home} className='capitalize'>
          Áo khoác
        </Link>
        <Link to={path.home} className='capitalize'>
          Quần jeans
        </Link>
        <Link to={path.home} className='capitalize'>
          Quần dài
        </Link>
        <Link to={path.home} className='capitalize'>
          Quần short
        </Link>
        <Link to={path.home} className='capitalize'>
          Áo
        </Link>
        <Link to={path.home} className='capitalize'>
          Đồ ngủ
        </Link>
      </div>
      <div className='mt-10 flex items-center gap-2'>
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
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
          />
        </svg>
        <div className='capitalize font-bold'>bộ lọc tìm kiếm</div>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='capitalize'>Khoảng giá</div>
      <div className='flex items-center justify-between gap-2 py-4'>
        <Input
          placeholder='Từ'
          isErrorPossible={false}
          type='number'
          classNameInput='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50 text-sm'
        />
        <div className='h-[1px] w-5 bg-black'></div>
        <Input
          placeholder='Đến'
          isErrorPossible={false}
          type='number'
          classNameInput='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50 text-sm'
        />
      </div>
      <Button className='bg-orange uppercase text-center py-2 w-full rounded-md text-white hover:bg-opacity-90'>
        Áp dụng
      </Button>

      <div className='mt-8 mb-4 h-[1px] bg-gray-300'></div>
      <div className='capitalize mb-4'>Đánh giá</div>
      <div className='pl-5 flex flex-col gap-3'>
        <StarList numberOfStarsFilled={5} fill='#ffa727' className='cursor-pointer hover:opacity-50' />
        <StarList numberOfStarsFilled={4} fill='#ffa727' className='cursor-pointer hover:opacity-50' />
        <StarList numberOfStarsFilled={3} fill='#ffa727' className='cursor-pointer hover:opacity-50' />
        <StarList numberOfStarsFilled={2} fill='#ffa727' className='cursor-pointer hover:opacity-50' />
        <StarList numberOfStarsFilled={1} fill='#ffa727' className='cursor-pointer hover:opacity-50' />
      </div>

      <div className='mt-8 mb-4 h-[1px] bg-gray-300'></div>
      <Button className='bg-orange uppercase text-center py-2 w-full rounded-md text-white hover:bg-opacity-90'>
        Xóa tất cả
      </Button>
    </div>
  )
}
