import { keepPreviousData, useQuery } from '@tanstack/react-query'

import productApi from 'src/apis/product.api'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductConfig } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import categoryApi from 'src/apis/category.api'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: dataProducts } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductConfig),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000
  })

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-4 xl:px-10'>
        <div className='grid grid-cols-12 gap-2 xl:gap-6'>
          <div className='hidden md:block md:col-span-4 lg:col-span-3 px-2'>
            <AsideFilter categories={dataCategories?.data.data ?? []} queryConfig={queryConfig} />
          </div>
          {dataProducts && (
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
              <SortProductList total_page={dataProducts?.data.data?.pagination?.page_size ?? 1} />
              {dataProducts.data.data?.products && dataProducts.data.data?.products.length == 0 ? (
                <div className='my-10 text-xl text-center'>Không tìm thấy sản phẩm phù hợp</div>
              ) : (
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-stretch'>
                  {dataProducts?.data.data?.products?.map((product) => {
                    return (
                      <div className='col-span-1' key={product._id}>
                        <ProductItem product={product} />
                      </div>
                    )
                  })}
                </div>
              )}
              <Pagination
                queryConfig={queryConfig}
                totalPages={dataProducts?.data.data?.pagination?.page_size ?? 1}
                range={2}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
