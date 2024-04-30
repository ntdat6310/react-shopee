import classNames from 'classnames'
import { omit } from 'lodash'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import ArrowLeft from 'src/components/Pagination/ArrowLeft'
import ArrowRight from 'src/components/Pagination/ArrowRight'
import path from 'src/constants/path'
import { ProductOrder, ProductSortBy } from 'src/constants/product.enum'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductConfig } from 'src/types/product.type'
interface Props {
  total_page: number | string
}

export default function SortProductList({ total_page }: Props) {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const isActive = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => sortByValue === queryConfig.sort_by

  const handleSortBy = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.products,
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue, page: '1' }, ['order'])).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductConfig['order'], undefined>) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({
        ...queryConfig,
        order: orderValue,
        sort_by: ProductSortBy.Price,
        page: '1'
      }).toString()
    })
  }
  return (
    <div className='flex items-center flex-wrap px-2 py-3 rounded-sm bg-gray-300 gap-3'>
      <div className=''>Sắp xếp theo</div>
      <Button
        className={classNames(
          'shadow-sm capitalize px-4 rounded-sm h-8 text-sm',
          {
            'bg-orange text-white': isActive(ProductSortBy.CreateAt)
          },
          {
            'bg-white text-black': !isActive(ProductSortBy.CreateAt)
          }
        )}
        onClick={() => {
          handleSortBy(ProductSortBy.CreateAt)
        }}
      >
        Mới nhất
      </Button>
      <Button
        className={classNames(
          'shadow-sm capitalize px-4 rounded-sm h-8 text-sm',
          {
            'bg-orange text-white': isActive(ProductSortBy.View)
          },
          {
            'bg-white text-black': !isActive(ProductSortBy.View)
          }
        )}
        onClick={() => {
          handleSortBy(ProductSortBy.View)
        }}
      >
        Phổ biến
      </Button>

      <Button
        className={classNames(
          'shadow-sm capitalize px-4 rounded-sm h-8 text-sm',
          {
            'bg-orange text-white': isActive(ProductSortBy.Sold)
          },
          {
            'bg-white text-black': !isActive(ProductSortBy.Sold)
          }
        )}
        onClick={() => {
          handleSortBy(ProductSortBy.Sold)
        }}
      >
        Bán chạy
      </Button>
      <select
        value={queryConfig.order || ''}
        onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductConfig['order'], undefined>)}
        className={classNames(
          'shadow-sm capitalize px-4 rounded-sm h-8 text-sm outline-none border-none',
          {
            'bg-orange text-white': isActive(ProductSortBy.Price)
          },
          {
            'bg-white text-black': !isActive(ProductSortBy.Price)
          }
        )}
      >
        <option className='bg-white text-black' value='' disabled>
          Giá
        </option>
        <option className='bg-white text-black' value={ProductOrder.Asc}>
          Giá: Thấp đến cao
        </option>
        <option className='bg-white text-black' value={ProductOrder.Desc}>
          Giá: Cao đến thấp
        </option>
      </select>
      <div className='flex items-center gap-2 ml-auto'>
        <div className=''>
          {queryConfig.page} / {total_page}
        </div>
        {Number(queryConfig.page) === 1 ? (
          <span className='h-8 px-2 flex items-center bg-white/60 rounded cursor-not-allowed'>
            <ArrowLeft />
          </span>
        ) : (
          <Link
            to={{
              pathname: path.products,
              search: createSearchParams({ ...queryConfig, page: (Number(queryConfig.page) - 1).toString() }).toString()
            }}
            className='h-8 px-2 flex items-center bg-white rounded'
          >
            <ArrowLeft />
          </Link>
        )}
        {Number(queryConfig.page) === total_page ? (
          <span className='h-8 px-2 flex items-center bg-white/60 rounded cursor-not-allowed'>
            <ArrowRight />
          </span>
        ) : (
          <Link
            to={{
              pathname: path.products,
              search: createSearchParams({ ...queryConfig, page: (Number(queryConfig.page) + 1).toString() }).toString()
            }}
            className='h-8 px-2 flex items-center bg-white rounded'
          >
            <ArrowRight />
          </Link>
        )}
      </div>
    </div>
  )
}
