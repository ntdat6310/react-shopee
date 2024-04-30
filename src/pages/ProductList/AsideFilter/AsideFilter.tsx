import classNames from 'classnames'
import { Link, useNavigate, createSearchParams } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import StarList from 'src/components/StarList'
import path from 'src/constants/path'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}
export default function AsideFilter({ categories, queryConfig }: Props) {
  const navigate = useNavigate()

  const handleClickStarList = (star: number) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({ ...queryConfig, page: '1', rating_filter: star.toString() }).toString()
    })
  }

  const handleClearAllFilter = () => {
    navigate({
      pathname: path.products,
      search: createSearchParams({ page: '1' }).toString()
    })
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
            search: createSearchParams({ page: '1' }).toString()
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
                search: createSearchParams({ page: '1', category: categoryItem._id }).toString()
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
      <div className='capitalize'>Khoảng giá</div>
      <div className='flex items-center justify-between gap-2 py-4'>
        <Input
          placeholder='Từ'
          isErrorPossible={false}
          type='number'
          classNameInput='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50 text-sm'
        />
        <div className='h-[1px] w-5 bg-black'></div>
        <Input
          placeholder='Đến'
          isErrorPossible={false}
          type='number'
          classNameInput='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50 text-sm'
        />
      </div>
      <Button className='bg-orange uppercase text-center py-2 w-full rounded-md text-white hover:bg-opacity-90'>
        Áp dụng
      </Button>

      <div className='mt-8 mb-4 h-[1px] bg-gray-300'></div>
      <div className='capitalize mb-4'>Đánh giá</div>
      <div className='pl-5 flex flex-col gap-3'>
        <div className=''>
          <StarList
            onClick={handleClickStarList}
            numberOfStarsFilled={5}
            className='cursor-pointer hover:opacity-50 gap-1'
          />
        </div>
        <div className='flex gap-2 text-sm'>
          <StarList
            onClick={handleClickStarList}
            numberOfStarsFilled={4}
            className='cursor-pointer hover:opacity-50 gap-1'
          />
          Trở lên
        </div>
        <div className='flex gap-2 text-sm'>
          <StarList
            onClick={handleClickStarList}
            numberOfStarsFilled={3}
            className='cursor-pointer hover:opacity-50 gap-1'
          />
          Trở lên
        </div>
        <div className='flex gap-2 text-sm'>
          <StarList
            onClick={handleClickStarList}
            numberOfStarsFilled={2}
            className='cursor-pointer hover:opacity-50 gap-1'
          />
          Trở lên
        </div>
        <div className='flex gap-2 text-sm'>
          <StarList
            onClick={handleClickStarList}
            numberOfStarsFilled={1}
            className='cursor-pointer hover:opacity-50 gap-1'
          />
          Trở lên
        </div>
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
