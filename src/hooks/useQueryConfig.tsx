import { omitBy, isUndefined } from 'lodash'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductConfig]: string
}
export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '15',
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
  return queryConfig
}
