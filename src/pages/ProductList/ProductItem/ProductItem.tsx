import { Link } from 'react-router-dom'
import StarList from 'src/components/StarList'

interface Props {
  description: string
}
export default function ProductItem({ description }: Props) {
  return (
    <Link to='/'>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-2px] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llndyykjnccvd9_tn'
            alt='image_product'
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        </div>
        <div className='p-2 min-h-[3.5rem] overflow-hidden'>
          <div className='line-clamp-2'>{description}</div>
        </div>
        <div className='flex items-center justify-start px-2 pb-2 gap-2'>
          <div className='text-gray-500'>
            <span className='text-xs mr-[2px] underline'>đ</span>
            <span className='line-through'>2.000</span>
          </div>
          <div className='text-orange'>
            <span className='text-xs mr-[2px] underline'>đ</span>
            <span className=''>2.000</span>
          </div>
        </div>
        <div className='flex flex-wrap items-center justify-between px-2 pb-4'>
          <div className=''>
            <StarList numberOfStarsFilled={3} className='gap-[1px]' />
          </div>
          <div className=''>2.2k Đã bán</div>
        </div>
      </div>
    </Link>
  )
}
