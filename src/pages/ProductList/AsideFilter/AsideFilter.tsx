import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { omit } from 'lodash'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import InputNumber from 'src/components/InputNumber'
import StarList from 'src/components/StarList'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { Schema, schema } from 'src/utils/rules'
interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = Pick<Schema, 'price_max' | 'price_min'>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categories, queryConfig }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: queryConfig.price_min ?? '',
      price_max: queryConfig.price_max ?? ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()

  useEffect(() => {
    setValue('price_min', queryConfig.price_min ?? '')
    setValue('price_max', queryConfig.price_max ?? '')
  }, [setValue, queryConfig])

  const handleClickStarList = (star: number) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({ ...queryConfig, page: '1', rating_filter: star.toString() }).toString()
    })
  }

  const handleClearAllFilter = () => {
    const newParams = omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category', 'name'])
    navigate({
      pathname: path.products,
      search: createSearchParams({ ...newParams, page: '1' }).toString()
    })
  }

  const onSubmitPriceFilter = handleSubmit((dataOnValid) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        price_min: dataOnValid.price_min ?? '',
        price_max: dataOnValid.price_max ?? ''
      }).toString()
    })
  })

  const isStarListActive = (rating: number) => {
    return queryConfig.rating_filter && queryConfig.rating_filter === String(rating)
  }
  return (
    <div>
      <div
        className={classNames('flex items-center gap-2', {
          'text-orange font-semibold': !queryConfig.category
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
          />
        </svg>
        <Link
          to={{
            pathname: path.products,
            search: createSearchParams(omit({ ...queryConfig, page: '1' }, ['category'])).toString()
          }}
          className='font-bold capitalize'
        >
          Tất cả danh mục
        </Link>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pl-5 flex flex-col gap-3 text-sm'>
        {categories.map((categoryItem) => {
          return (
            <Link
              to={{
                pathname: path.products,
                search: createSearchParams({ ...queryConfig, page: '1', category: categoryItem._id }).toString()
              }}
              className={classNames('capitalize', {
                'text-orange font-semibold': categoryItem._id === queryConfig.category
              })}
              key={categoryItem._id}
            >
              {categoryItem.name}
            </Link>
          )
        })}
      </div>
      <div className='mt-10 flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
          />
        </svg>
        <div className='capitalize font-bold'>bộ lọc tìm kiếm</div>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='capitalize mb-4'>Khoảng giá</div>
      <form onSubmit={onSubmitPriceFilter}>
        <div className='flex items-center justify-between gap-2'>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => {
              return (
                <InputNumber
                  placeholder='Từ'
                  type='text'
                  classNameInput='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50 text-sm'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger() // Validate all input fields
                  }}
                  value={field.value}
                  isErrorPossible={false}
                />
              )
            }}
          />
          <div className='h-[1px] w-5 bg-black'></div>
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  placeholder='Đến'
                  type='text'
                  classNameInput='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50 text-sm'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger() // Validate all input fields
                  }}
                  value={field.value}
                  isErrorPossible={false}
                />
              )
            }}
          />
        </div>
        <div className='h-8 flex items-center justify-center text-red min-h-[1.25rem] text-sm'>
          {' '}
          {errors.price_min?.message || errors.price_max?.message}
        </div>
        <Button
          type='submit'
          className='bg-orange uppercase text-center py-2 w-full rounded-md text-white hover:bg-opacity-90'
        >
          Áp dụng
        </Button>
      </form>

      <div className='mt-8 mb-4 h-[1px] bg-gray-300'></div>
      <div className='capitalize mb-4'>Đánh giá</div>
      <div className='pl-3 flex flex-col gap-1 items-baseline'>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const rating = 5 - index
            return (
              <div
                className={classNames('py-1 px-1 rounded text-sm flex gap-2', {
                  'bg-gray-300': isStarListActive(rating)
                })}
                key={index}
              >
                <StarList
                  onClick={handleClickStarList}
                  numberOfStarsFilled={rating}
                  className='cursor-pointer hover:opacity-50 gap-1'
                />
                {rating < 5 && <span>Trở lên</span>}
              </div>
            )
          })}
      </div>

      <div className='mt-8 mb-4 h-[1px] bg-gray-300'></div>
      <Button
        onClick={handleClearAllFilter}
        className='bg-orange uppercase text-center py-2 w-full rounded-md text-white hover:bg-opacity-90'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
