import { useMutation, useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import CartItem from './CartItem'
import { PurchaseStatus } from 'src/constants/purchaseStatus.enum'
import purchaseApi from 'src/apis/purchase.api'
import { Purchase } from 'src/types/purchase.type'
import { useEffect, useMemo, useState } from 'react'
import { keyBy } from 'lodash'
import { formatCurrency } from 'src/utils/utils'
import Spinner from 'src/components/Spinner'
import NoProductInCart from 'src/components/ShoppingCart/NoProductInCart'
import { useLocation } from 'react-router-dom'

export interface ExtendedPurchase extends Purchase {
  checked: boolean
  disable: boolean
}

const MySwal = withReactContent(Swal)

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const {
    data: purchases,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['purchases', PurchaseStatus.inCart],
    queryFn: () => purchaseApi.getPurchases({ status: PurchaseStatus.inCart })
  })

  const { state } = useLocation()
  const selectedProductId = state?.productId

  useEffect(() => {
    if (purchases?.data.data) {
      setExtendedPurchases((prev) => {
        const extendedPurchasesObject = keyBy(prev, '_id')
        return purchases.data.data.map((purchase) => {
          return {
            ...purchase,
            checked: Boolean(
              extendedPurchasesObject[purchase._id]?.checked || purchase.product._id === selectedProductId
            ),
            disable: false
          }
        })
      })
    }
  }, [purchases, selectedProductId])

  useEffect(() => {
    return () => {
      window.history.replaceState(null, '')
    }
  }, [])

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updateCart,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyPurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases((prev) => {
      const newPurchases = [...prev]
      newPurchases[purchaseIndex].checked = event.target.checked
      return newPurchases
    })
  }

  const isCheckedAll = useMemo(() => extendedPurchases.every((item) => item.checked), [extendedPurchases])

  const handleCheckedAll = () => {
    setExtendedPurchases((prev) => {
      return prev.map((item) => ({ ...item, checked: !isCheckedAll }))
    })
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases((prev) => {
      const newPurchases = [...prev]
      newPurchases[purchaseIndex] = { ...newPurchases[purchaseIndex], buy_count: value }
      return newPurchases
    })
  }

  const handleOnBlue = (purchaseIndex: number) => (value: number) => {
    if (value !== purchases?.data.data[purchaseIndex].buy_count) {
      updatePurchaseMutation.mutate({
        buy_count: value,
        product_id: extendedPurchases[purchaseIndex].product._id as string
      })
    }
  }

  const handleQuantityChange = (purchaseIndex: number, value: number) => {
    if (value >= 1 || value <= (extendedPurchases[purchaseIndex].product.quantity as number)) {
      setExtendedPurchases((prev) => {
        const newPurchases = [...prev]
        newPurchases[purchaseIndex] = { ...newPurchases[purchaseIndex], buy_count: value, disable: true }
        return newPurchases
      })
      updatePurchaseMutation.mutate({
        buy_count: value,
        product_id: extendedPurchases[purchaseIndex].product._id as string
      })
    }
  }

  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])

  const totalCheckedPurchasesPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return (result += current.buy_count * (current.product.price as number))
      }, 0),
    [checkedPurchases]
  )

  const totalCheckedPurchasesSavingPrice = useMemo(() => {
    return checkedPurchases.reduce((result, current) => {
      return (result +=
        current.buy_count * (Number(current.product.price_before_discount) - Number(current.product.price)))
    }, 0)
  }, [checkedPurchases])

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    deletePurchaseMutation.mutate([extendedPurchases[purchaseIndex]._id])
  }

  const handleDeleteManyPurchases = () => {
    if (checkedPurchases.length > 0) {
      MySwal.fire({
        icon: 'warning',
        title: `Bạn muốn xóa ${checkedPurchases.length} sản phẩm`,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Xóa'
      }).then((result) => {
        if (result.isConfirmed) {
          deletePurchaseMutation.mutate(checkedPurchases.map((item) => item._id))
        }
      })
    }
  }

  const buyPurchases = () => {
    if (checkedPurchases.length > 0) {
      buyPurchaseMutation.mutate(
        checkedPurchases.map((item) => ({
          product_id: item.product._id as string,
          buy_count: item.buy_count
        })),
        {
          onSuccess(data) {
            MySwal.fire({
              icon: 'success',
              text: data.data.message,
              timer: 2000
            })
          }
        }
      )
    }
  }

  return (
    <div className='bg-gray-100 py-16'>
      <div className='max-w-7xl mx-auto px-4 xl:px-10'>
        {isLoading && !purchases && <Spinner />}
        {!isLoading &&
          (extendedPurchases.length > 0 ? (
            <>
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
                      return (
                        <CartItem
                          purchase={extendedPurchase}
                          key={index}
                          handleChecked={handleChecked(index)}
                          handleQuantityChange={(value) => handleQuantityChange(index, value)}
                          handleTypeQuantity={handleTypeQuantity(index)}
                          handleOnBlue={handleOnBlue(index)}
                          onDelete={handleDeletePurchase(index)}
                        />
                      )
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
                  <button
                    onClick={handleDeleteManyPurchases}
                    className='capitalize py-[2px] px-1 text-orange hover:text-red border-b-[1px] border-transparent hover:border-orange transition-all'
                  >
                    Xóa
                  </button>
                </div>
                <div className='flex flex-col justify-start items-start lg:flex-row lg:items-center mt-3 lg:mt-0'>
                  <div className='flex flex-col items-start lg:items-end gap-1 sm:ml-4 lg:ml-0'>
                    <div className=''>
                      <span className='text-xs sm:text-sm'>{`Tổng thanh toán (${checkedPurchases.length} sản phẩm)`}</span>
                      <span className='text-base sm:text-xl text-orange ml-1'>{`₫${formatCurrency(totalCheckedPurchasesPrice)}`}</span>
                    </div>
                    <div className='text-xs'>
                      <span className='mr-2'>Tiết kiệm</span>
                      <span>{`₫${formatCurrency(totalCheckedPurchasesSavingPrice)}`}</span>
                    </div>
                  </div>

                  <button
                    onClick={buyPurchases}
                    className='mt-3 lg:mt-0 sm:ml-4 capitalize py-2 lg:py-3 px-6  lg:px-10 bg-orange rounded text-white lg:text-base'
                  >
                    Mua hàng
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NoProductInCart />
          ))}
      </div>
    </div>
  )
}
