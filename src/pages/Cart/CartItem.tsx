import { Link } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController'
import { ExtendedPurchase } from './Cart'
import path from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface Props {
  purchase: ExtendedPurchase
  handleChecked?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleQuantityChange: (value: number) => void
  handleTypeQuantity: (value: number) => void
  handleOnBlue?: (value: number) => void
}

export default function CartItem({
  purchase,
  handleChecked,
  handleQuantityChange,
  handleTypeQuantity,
  handleOnBlue
}: Props) {
  return (
    <div className='grid grid-cols-12 shadow border-[1px] border-gray-200'>
      <div className='col-span-5 py-5'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-start px-3'>
            <input
              type='checkbox'
              className='h-5 w-5 accent-orange'
              checked={purchase.checked}
              onChange={handleChecked}
            />
          </div>
          <Link
            to={`${path.product}/${generateNameId({
              name: purchase.product.name as string,
              id: purchase.product._id as string
            })}`}
          >
            <div className='flex flex-grow items-center gap-3 mr-3 hover:text-black'>
              <img src={purchase.product.image} alt='product_img' className='h-20 w-20 object-cover rounded' />
              <div className='line-clamp-2'>{purchase.product.name}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className='col-span-7'>
        <div className='grid grid-cols-10 h-full'>
          <div className='col-span-3'>
            <div className='flex items-center justify-center h-full'>
              <span className='line-through'>₫{formatCurrency(purchase.product.price_before_discount ?? 0)}</span>
              <span className='ml-2 text-black'>₫{formatCurrency(purchase.product.price ?? 0)}</span>
            </div>
          </div>
          <div className='col-span-3'>
            <div className='flex items-center justify-center h-full'>
              <QuantityController
                value={purchase.buy_count}
                onIncrease={handleQuantityChange}
                onDecrease={handleQuantityChange}
                onType={handleTypeQuantity}
                max={purchase.product.quantity}
                disabled={purchase.disable}
                onFocusOut={handleOnBlue}
              />
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex items-center justify-center h-full text-orange'>
              ₫{formatCurrency((purchase.product.price as number) * purchase.buy_count)}
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex items-center justify-center h-full'>
              <button className='capitalize py-[2px] px-1 text-orange hover:text-red border-b-[1px] border-transparent hover:border-orange transition-all'>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
