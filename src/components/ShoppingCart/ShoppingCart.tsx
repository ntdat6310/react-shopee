import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { PurchaseStatus } from 'src/constants/purchaseStatus.enum'
import purchaseApi from 'src/apis/purchase.api'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import NoProductInCart from './NoProductInCart'
interface Props {
  classNames?: string
}

const MAX_SHOW_PRODUCTS_IN_CART = 5
export default function ShoppingCart({ classNames = '' }: Props) {
  const { isAuthenticated } = useContext(AppContext)
  const { data } = useQuery({
    queryKey: ['purchases', PurchaseStatus.inCart],
    queryFn: () => purchaseApi.getPurchases({ status: PurchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const inCartPurchasesData = data?.data.data || []
  return (
    <Popover
      childrenClasses={classNames}
      renderPopover={
        <div className='bg-white shadow-md text-gray-600 max-w-[350px] md:max-w-[400px] lg:max-w-[500px] text-sm'>
          {inCartPurchasesData.length > 0 ? (
            <>
              <div className='p-4 capitalize text-gray-400'>Sản phẩm mới thêm</div>
              {inCartPurchasesData.slice(0, MAX_SHOW_PRODUCTS_IN_CART).map((item, index) => {
                return (
                  <Link
                    to={`${path.product}/${generateNameId({
                      name: item.product.name as string,
                      id: item.product._id as string
                    })}`}
                    key={index}
                  >
                    <div className='py-2 px-4 hover:bg-gray-200 flex items-center gap-2'>
                      <div className='flex-shrink-0'>
                        <img
                          src={item.product.image}
                          alt='image_product'
                          className='w-10 h-10 object-cover rounded-sm'
                        />
                      </div>
                      <div className='flex-grow overflow-hidden'>
                        <div className='truncate'>{item.product.name}</div>
                      </div>
                      <div className='flex-shrink-0'>
                        <div className='text-[#d0011b]'>₫ {formatCurrency(item.product.price || 0)}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
              <div className='flex flex-wrap items-center justify-center lg:justify-between mt-4 gap-2'>
                <span className='text-gray-400 pl-4'>Có {inCartPurchasesData.length} sản phẩm trong giỏ hàng</span>
                <button className='py-2 px-4 w-full lg:w-auto text-center bg-orange hover:bg-opacity-90 transition-all text-white capitalize'>
                  Xem giỏ hàng
                </button>
              </div>
            </>
          ) : (
            <NoProductInCart />
          )}
        </div>
      }
    >
      <div className='flex items-center justify-center text-white w-full h-full relative'>
        <span>
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
        </span>

        {inCartPurchasesData.length > 0 && (
          <span className='absolute top-0 right-0 bg-white/90 text-red rounded-full w-7 h-5 flex items-center justify-center font-semibold'>
            {inCartPurchasesData.length}
          </span>
        )}
      </div>
    </Popover>
  )
}
