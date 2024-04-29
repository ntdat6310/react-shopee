import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'

export default function ProductList() {
  const searchParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => productApi.getProducts(searchParams)
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-4 xl:px-10'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='hidden md:block md:col-span-3 px-2'>
            <AsideFilter />
          </div>
          <div className='col-span-12 md:col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
              {data &&
                data.data.data?.products?.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <ProductItem product={product} />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
