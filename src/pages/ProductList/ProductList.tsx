import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductConfig]: string
}

export default function ProductList() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductConfig),
    placeholderData: keepPreviousData
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
            <Pagination queryConfig={queryConfig} totalPages={data?.data.data?.pagination?.page_size ?? 1} range={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
