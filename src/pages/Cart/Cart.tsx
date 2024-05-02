import { useQuery } from '@tanstack/react-query'
import CartItem from './CartItem'
import { PurchaseStatus } from 'src/constants/purchaseStatus.enum'
import purchaseApi from 'src/apis/purchase.api'
import { Purchase } from 'src/types/purchase.type'
import { useEffect, useState } from 'react'

export interface ExtendedPurchase extends Purchase {
  checked: boolean
  disable: boolean
}

export default function Cart() {
  const { data: purchases } = useQuery({
    queryKey: ['purchases', PurchaseStatus.inCart],
    queryFn: () => purchaseApi.getPurchases({ status: PurchaseStatus.inCart })
  })

  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])

  useEffect(() => {
    if (purchases?.data.data) {
      setExtendedPurchases(() => {
        return purchases.data.data.map((purchase) => {
          return { ...purchase, checked: false, disable: false }
        })
      })
    }
  }, [purchases])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases((prev) => {
      const newPurchases = [...prev]
      newPurchases[purchaseIndex].checked = event.target.checked
      return newPurchases
    })
  }

  const isCheckedAll = extendedPurchases.every((item) => item.checked)
  const handleCheckedAll = () => {
    setExtendedPurchases((prev) => {
      return prev.map((item) => ({ ...item, checked: !isCheckedAll }))
    })
  }

  return (
    <div className='bg-gray-300 py-16'>
      <div className='max-w-7xl mx-auto px-4 xl:px-10'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='rounded-sm bg-white text-sm capitalize text-gray-500 grid grid-cols-12 shadow px-6'>
              <div className='col-span-5 py-5'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-start px-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      onChange={handleCheckedAll}
                      checked={isCheckedAll}
                    />
                  </div>
                  <div className='text-black flex-grow'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-7'>
                <div className='grid grid-cols-10'>
                  <div className='col-span-3 py-5 text-center'>Đơn giá</div>
                  <div className='col-span-3 py-5 text-center'>Số lượng</div>
                  <div className='col-span-2 py-5 text-center'>Số tiền</div>
                  <div className='col-span-2 py-5 text-center'>Thao tác</div>
                </div>
              </div>
            </div>

            <div className='mt-3 rounded-sm bg-white text-sm capitalize text-gray-500 px-6 flex flex-col gap-4 py-4'>
              {extendedPurchases.map((extendedPurchase, index) => {
                return <CartItem purchase={extendedPurchase} key={index} handleChecked={handleChecked(index)} />
              })}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-6 bg-white rounded py-5 px-3 sm:px-4 flex flex-col justify-start lg:flex-row lg:items-center lg:justify-between text-sm border-[1px] border-gray-300 shadow'>
          <div className='flex items-center gap-3 lg:gap-5'>
            <div className='flex flex-shrink-0 items-center justify-start sm:pl-5'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                onChange={handleCheckedAll}
                checked={isCheckedAll}
              />
            </div>
            <div className='capitalize'>Chọn tất cả ({extendedPurchases.length})</div>
            <button className='capitalize py-[2px] px-1 text-orange hover:text-red border-b-[1px] border-transparent hover:border-orange transition-all'>
              Xóa
            </button>
          </div>
          <div className='flex flex-col justify-start items-start lg:flex-row lg:items-center mt-3 lg:mt-0'>
            <div className='flex flex-col items-start lg:items-end gap-1 sm:ml-4 lg:ml-0'>
              <div className=''>
                <span className='text-xs sm:text-sm'>Tổng thanh toán (2 sản phẩm):</span>
                <span className='text-base sm:text-xl text-orange'>₫166.000</span>
              </div>
              <div className='text-xs'>
                <span className='mr-2'>Tiết kiệm</span>
                <span>₫166.000</span>
              </div>
            </div>

            <button className='mt-3 lg:mt-0 sm:ml-4 capitalize py-2 lg:py-3 px-6  lg:px-10 bg-orange rounded text-white lg:text-base'>
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
