import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ArrowLeft from 'src/components/Pagination/ArrowLeft'
import ArrowRight from 'src/components/Pagination/ArrowRight'
import QuantityController from 'src/components/QuantityController/QuantityController'
import StarList from 'src/components/StarList'
import path from 'src/constants/path'
import { ProductSortBy } from 'src/constants/product.enum'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductConfig } from 'src/types/product.type'
import {
  calculateDiscountPercent,
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
  getIdFromNameId
} from 'src/utils/utils'

export default function Product() {
  const [buyCount, setBuyCount] = useState(1)

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    },
    enabled: id !== undefined
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const product = productData?.data.data
  const imageRef = useRef<HTMLImageElement>(null)

  const currentImages = useMemo(() => {
    return (product && product.images?.slice(currentIndexImages[0], currentIndexImages[1])) ?? []
  }, [product, currentIndexImages])

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const topSoldProductsConfig: QueryConfig = {
    limit: '20',
    page: '1',
    order: ProductSortBy.Sold,
    category: product?.category?._id
  }

  const { data: topSoldProducts } = useQuery({
    queryKey: ['categories', topSoldProductsConfig],
    queryFn: () => productApi.getProducts(topSoldProductsConfig as ProductConfig),
    staleTime: 3 * 60 * 1000
  })

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
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    // Cách 1 : Lấy offsetX, offsetY khi đã xử lý được bubble event
    const { offsetX, offsetY } = event.nativeEvent

    // Cách 2 : Lấy offsetX, offsetY khi không xử lý được bubble event
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const resetZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleCountChange = (value: number) => {
    setBuyCount(value)
  }
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white m-4 shadow min-h-10 rounded'>
        <div className='max-w-7xl mx-auto px-4 xl:px-10 py-4'>
          <div className='grid grid-cols-12 md:gap-2 lg:gap-10'>
            <div className='col-span-12 lg:col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden hover:cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={resetZoom}
              >
                <img
                  src={activeImage}
                  alt='img_product'
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover rounded pointer-events-none'
                  ref={imageRef}
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

              <QuantityController max={productData.data.data.quantity} setValue={handleCountChange} value={buyCount} />

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

      <div className='m-4 min-h-10 rounded'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-12 gap-3 xl:gap-5'>
            <div className='col-span-12 md:col-span-8 xl:col-span-9 bg-white p-4 lg:p-6 rounded'>
              <h2 className='text-xl font-semibold'>Mô tả sản phẩm</h2>
              <div className='mt-4 leading-loose text-sm'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productData.data.data.description ?? '')
                  }}
                ></div>
              </div>
            </div>
            <div className='col-span-12 md:col-span-4 xl:col-span-3 bg-white p-4 lg:p-6 rounded'>
              <h2 className='text-lg font-semibold text-gray-600 text-center'>Sản phẩm bán chạy</h2>
              <div className='mt-4 flex flex-col gap-8'>
                {topSoldProducts &&
                  topSoldProducts.data.data?.products?.map((product, index) => {
                    return (
                      <Link
                        to={`${path.product}/${generateNameId({
                          name: product.name as string,
                          id: product._id as string
                        })}`}
                        className='p-2 rounded border-2 border-transparent hover:border-gray-300'
                        key={index}
                      >
                        <div className='relative w-full pt-[100%]'>
                          <img
                            src={product.image}
                            alt='img_product'
                            className='absolute top-0 left-0 h-full w-full bg-white object-cover rounded pointer-events-none'
                          />
                        </div>
                        <div className='line-clamp-2 my-2'>{product.name}</div>
                        <div className='text-red'>
                          <span className='mr-1'>₫</span>
                          {formatCurrency(product.price ?? 0)}
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
