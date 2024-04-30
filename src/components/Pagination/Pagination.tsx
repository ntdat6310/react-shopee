import { Link, createSearchParams } from 'react-router-dom'
import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'
import ThreeDot from './ThreeDot'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  totalPages: number
  range?: number
  queryConfig: QueryConfig
}

const FIRST_PAGE = 1
const CLICKABLE_CSS = 'h-8 w-8 rounded shadow-sm bg-white flex items-center justify-center'
const UNCLICKABLE_CSS = `${CLICKABLE_CSS} bg-opacity-60 cursor-not-allowed`

export default function Pagination({ totalPages: LAST_PAGE, queryConfig, range = 2 }: Props) {
  const currentPage = Number(queryConfig.page)
  const firstRange = Math.max(currentPage - range, 1)
  const lastRange = Math.min(currentPage + range, LAST_PAGE)
  let isHeadDotShowed = false
  let isTailDotShowed = false
  return (
    <div className='mt-4 flex items-center flex-wrap gap-2 justify-center'>
      {/* Previous */}
      {FIRST_PAGE === currentPage ? (
        <span className={UNCLICKABLE_CSS}>
          <ArrowLeft />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.products,
            search: createSearchParams({ ...queryConfig, page: (currentPage - 1).toString() }).toString()
          }}
          className={CLICKABLE_CSS}
        >
          <ArrowLeft />
        </Link>
      )}
      {Array(LAST_PAGE)
        .fill(0)
        .map((_, index) => {
          const pageIndex = index + 1
          // Render head dot or skip
          if (pageIndex !== FIRST_PAGE && pageIndex < firstRange) {
            if (!isHeadDotShowed) {
              isHeadDotShowed = true
              return <ThreeDot key={pageIndex} />
            }
            return null
          }
          // Render tail dot or skip
          if (pageIndex !== LAST_PAGE && pageIndex > lastRange) {
            if (!isTailDotShowed) {
              isTailDotShowed = true
              return <ThreeDot key={pageIndex} />
            }
            return null
          }
          // Render first, last and page range
          return pageIndex === currentPage ? (
            <span className={UNCLICKABLE_CSS} key={pageIndex}>
              {pageIndex}
            </span>
          ) : (
            <Link
              to={{
                pathname: path.products,
                search: createSearchParams({ ...queryConfig, page: pageIndex.toString() }).toString()
              }}
              className={CLICKABLE_CSS}
              key={pageIndex}
            >
              {pageIndex}
            </Link>
          )
        })}
      {/* Next */}
      {LAST_PAGE === currentPage ? (
        <span className={UNCLICKABLE_CSS}>
          <ArrowRight />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.products,
            search: createSearchParams({ ...queryConfig, page: (currentPage + 1).toString() }).toString()
          }}
          className={CLICKABLE_CSS}
        >
          <ArrowRight />
        </Link>
      )}
    </div>
  )
}
