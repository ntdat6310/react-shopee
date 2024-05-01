import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import InputNumber from 'src/components/InputNumber'
import ArrowLeft from 'src/components/Pagination/ArrowLeft'
import ArrowRight from 'src/components/Pagination/ArrowRight'
import StarList from 'src/components/StarList'
import { calculateDiscountPercent, formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

export default function Product() {
  const { id } = useParams()
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    },
    enabled: id !== undefined
  })
  const product = productData?.data.data

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const currentImages = useMemo(() => {
    return (product && product.images?.slice(currentIndexImages[0], currentIndexImages[1])) ?? []
  }, [product, currentIndexImages])

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) {
    return null
  }

  const onButtonRightClick = () => {
    if (product.images && currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const onButtonLeftClick = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white m-4 shadow min-h-10 rounded'>
        <div className='max-w-7xl mx-auto px-4 xl:px-10 py-4'>
          <div className='grid grid-cols-12 md:gap-2 lg:gap-10'>
            <div className='col-span-12 lg:col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={activeImage}
                  alt='img_product'
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover rounded'
                />
              </div>
              <div className='grid grid-cols-5 gap-[2px] md:gap-2 relative mt-4 rounded'>
                <button
                  onClick={onButtonLeftClick}
                  className='absolute left-0 top-1/2 z-10 h-7 w-7 -translate-y-1/2 bg-black/50 rounded text-white'
                >
                  <div className='flex items-center justify-center h-full w-full'>
                    <ArrowLeft className='w-5 h-5' />
                  </div>
                </button>
                <button
                  onClick={onButtonRightClick}
                  className='absolute right-0 top-1/2 z-10 h-7 w-7 -translate-y-1/2 bg-black/50 rounded text-white'
                >
                  <div className='flex items-center justify-center h-full w-full'>
                    <ArrowRight className='w-5 h-5' />
                  </div>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='col-span-1 relative w-full pt-[100%] shadow'
                      key={img}
                      onMouseEnter={() => {
                        setActiveImage(img)
                      }}
                    >
                      <img
                        src={img}
                        alt={productData.data.data.name}
                        className='absolute top-0 left-0 h-full w-full bg-white object-cover rounded'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange rounded'></div>}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='col-span-12 lg:col-span-7'>
              <h1 className='mt-8 lg:mt-0 text-xl font-medium capitalize'>{productData.data.data.name}</h1>

              <div className='mt-6 flex items-center flex-wrap justify-start gap-3'>
                <div className='flex items-center gap-1'>
                  <span className='text-orange border-b-2 border-orange'>{productData.data.data.rating}</span>
                  <StarList fill='#ee4d2d' numberOfStarsFilled={Math.ceil(productData.data.data.rating ?? 0)} />
                </div>
                <div className='h-6 w-[1px] bg-gray-400'></div>
                <div className=''>
                  <span>{formatNumberToSocialStyle(productData.data.data.view ?? 0)}</span>
                  <span className='ml-2 text-gray-500'>Lượt xem</span>
                </div>
                <div className='h-6 w-[1px] bg-gray-400'></div>
                <div className=''>
                  <span>{formatNumberToSocialStyle(productData.data.data.sold ?? 0)}</span>
                  <span className='ml-2 text-gray-500'>Đã bán</span>
                </div>
              </div>

              <div className='mt-6 flex items-center flex-wrap bg-gray-100 py-4 px-2 rounded gap-5'>
                <div className='flex items-baseline gap-1 text-gray-400 '>
                  <span className='self-start'>₫</span>
                  <span className='line-through'>
                    {formatCurrency(productData.data.data.price_before_discount ?? 0)}
                  </span>
                </div>
                <div className='flex items-baseline gap-1 text-orange'>
                  <span className='text-3xl'>₫</span>
                  <span className='text-3xl'> {formatCurrency(productData.data.data.price ?? 0)}</span>
                </div>
                <div className='bg-red py-1 px-2 uppercase text-white rounded text-sm'>{`${calculateDiscountPercent({
                  origin: productData.data.data.price_before_discount ?? 0,
                  sale: productData.data.data.price ?? 0
                })}% giảm`}</div>
              </div>

              <div className='mt-6 flex items-center flex-wrap gap-5'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='flex items-center'>
                  <button className='flex items-center justify-center rounded-tl-md rounded-bl-md border-[1px] border-gray-300 h-8 w-8'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber classNameInput='h-8 text-center w-12 outline-none border-[1px] border-gray-300 ' />
                  <button className='flex items-center justify-center rounded-tr-md rounded-br-md border-[1px] border-gray-300 h-8 w-8'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                </div>
                <div className='text-sm text-gray-500'>{productData.data.data.quantity} sản phẩm có sẵn</div>
              </div>

              <div className='mt-6 flex items-center flex-wrap gap-5'>
                <button className='h-10 px-2 rounded flex items-center justify-center bg-red/10 border-[1px] border-red hover:bg-red/5 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='#d0011b'
                    className='w-5 h-5 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  <span className='capitalize text-red text-xs'>Thêm vào giỏ hàng</span>
                </button>

                <button className='h-10 px-10 capitalize bg-red text-white rounded text-xs hover:bg-red/80'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white m-4 shadow min-h-10 rounded'>
        <div className='max-w-7xl mx-auto px-4 xl:px-10 py-4'>
          <h2 className='text-xl font-semibold'>Mô tả sản phẩm</h2>
          <div className='mt-4 leading-loose text-sm'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productData.data.data.description ?? '')
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
