import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Spinner from 'src/components/Spinner'
import path from 'src/constants/path'
import { PurchaseStatus } from 'src/constants/purchaseStatus.enum'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import NoPurchase from '../../components/NoPurchase'
import { formatCurrency, getDateString } from 'src/utils/utils'

const purchaseTabs = [
  { status: PurchaseStatus.all, name: 'Tất cả' },
  { status: PurchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: PurchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: PurchaseStatus.inProgress, name: 'Đang giao' },
  { status: PurchaseStatus.delivered, name: 'Đã giao' },
  { status: PurchaseStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams = useQueryParams()
  const status = Number.isNaN(Number(queryParams?.status)) ? PurchaseStatus.all : Number(queryParams?.status)

  const { data: purchases, isLoading } = useQuery({
    queryKey: ['purchase', status],
    queryFn: () => {
      return purchaseApi.getPurchases({
        status: status as PurchaseListStatus
      })
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  })

  console.log(purchases)

  const purchaseTabsLink = purchaseTabs.map((purchaseTab, index) => {
    return (
      <Link
        key={index}
        to={{
          pathname: path.historyPurchase,
          search: createSearchParams({ status: String(purchaseTab.status) }).toString()
        }}
        className={classNames('border-b-2 py-2 px-3', {
          'border-orange': status === purchaseTab.status,
          'border-transparent': status !== purchaseTab.status
        })}
      >
        {purchaseTab.name}
      </Link>
    )
  })

  const purchaseList = purchases?.data.data.map((purchase) => {
    return (
      <div className='py-2 px-4 flex items-center gap-4' key={purchase._id}>
        <div className='w-20 h-20 border border-gray-300 rounded-md flex-shrink-0'>
          <img src={purchase.product.image} alt='' className='w-full h-full object-cover rounded-md' />
        </div>
        <div className=''>
          <div className='line-clamp-2 max-w-[600px]'>{purchase.product.name}</div>
          <p className='mt-2 font-semibold'>x{purchase.buy_count}</p>
        </div>
        <div className='ml-auto self-stretch'>
          <div className='flex flex-col justify-end gap-2 h-full'>
            <div className='text-end text-xs'>{getDateString(new Date(purchase.createdAt))}</div>
            <div className=''>
              <span className='text-xs line-through'>
                ₫{formatCurrency(purchase.product.price_before_discount ?? 0)}
              </span>
              <span className='ml-4 text-orange'>₫{formatCurrency(purchase.product.price ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className='overflow-auto py-1 bg-white px-4 rounded-md'>
        <div className='flex items-center justify-around flex-wrap min-w-[700px] py-2'>{purchaseTabsLink}</div>
      </div>

      <div className='mt-4 py-8 min-h-[400px] bg-white overflow-auto rounded-md'>
        <div className='min-w-[700px]'>
          {isLoading ? <Spinner /> : purchaseList && purchaseList.length > 0 ? purchaseList : <NoPurchase />}
        </div>
      </div>
    </div>
  )
}
