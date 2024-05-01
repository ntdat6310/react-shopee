import { Link } from 'react-router-dom'
import StarList from 'src/components/StarList'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: Product
}

export default function ProductItem({ product }: Props) {
  return (
    <Link
      to={`${path.product}/${generateNameId({
        name: product.name as string,
        id: product._id as string
      })}`}
    >
      <div className='bg-white shadow rounded-md hover:translate-y-[-2px] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative shadow-sm'>
          <img
            src={product.image}
            alt='image_product'
            className='absolute top-0 left-0 w-full h-full object-cover rounded-t-md'
          />
        </div>
        <div className='p-2 min-h-[3.5rem] overflow-hidden'>
          <div className='line-clamp-2'>{product.name}</div>
        </div>
        <div className='flex items-center justify-start px-2 pb-2 gap-2'>
          <div className='text-gray-500'>
            <span className='text-xs mr-[2px] underline'>đ</span>
            <span className='line-through'>{product.price_before_discount}</span>
          </div>
          <div className='text-orange'>
            <span className='text-xs mr-[2px] underline'>đ</span>
            <span className=''>{formatCurrency(product.price ?? 0)}</span>
          </div>
        </div>
        <div className='flex flex-wrap items-center justify-between px-2 pb-4'>
          <div className=''>
            <StarList numberOfStarsFilled={Math.floor(Number(product.rating))} className='gap-[1px]' />
          </div>
          <div className=''>{`${formatNumberToSocialStyle(product.sold ?? 0)} Đã bán`}</div>
        </div>
      </div>
    </Link>
  )
}
