import { keepPreviousData, useQuery } from '@tanstack/react-query'

import productApi from 'src/apis/product.api'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductConfig } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductConfig),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-4 xl:px-10'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='hidden md:block md:col-span-3 px-2'>
            <AsideFilter />
          </div>
          {data && (
            <div className='col-span-12 md:col-span-9'>
              <SortProductList total_page={data.data.data?.pagination?.page_size ?? 1} />
              <div className='mt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                {data.data.data?.products?.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <ProductItem product={product} />
                    </div>
                  )
                })}
              </div>
              <Pagination
                queryConfig={queryConfig}
                totalPages={data?.data.data?.pagination?.page_size ?? 1}
                range={2}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
