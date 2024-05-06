import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import LanguageDropdownMenu from '../LanguageDropdownMenu'
import UserDropdownMenu from '../UserDropdownMenu'
import ShoppingCart from '../ShoppingCart'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { useForm } from 'react-hook-form'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { omit } from 'lodash'
import ShopeeLogo from '../ShopeeLogo'
import { useTranslation } from 'react-i18next'
interface FormData {
  search: string
}
export default function Header() {
  const { t } = useTranslation('header')
  const { isAuthenticated } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      search: queryConfig.name ?? ''
    }
  })

  useEffect(() => {
    setValue('search', queryConfig.name ?? '')
  }, [queryConfig, setValue])

  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = handleSubmit((onValid) => {
    const name = onValid.search.trim()
    if (name !== '') {
      if (location.pathname === path.products) {
        navigate({ pathname: path.products, search: createSearchParams({ ...queryConfig, name: name }).toString() })
      } else {
        navigate({ pathname: path.products, search: createSearchParams({ name: name }).toString() })
      }
    } else {
      if (location.pathname === path.products) {
        navigate({ pathname: path.products, search: createSearchParams(omit({ ...queryConfig }, ['name'])).toString() })
      }
    }
  })

  return (
    <div className='pt-2 pb-4 bg-orange text-sm'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4'>
        <div className='flex justify-between lg:justify-end flex-wrap gap-2 mb-3'>
          <div className='lg:hidden'>
            <Link to={path.home}>
              <ShopeeLogo classNameLogo='h-7 sm:h-8 fill-white' />
            </Link>
          </div>
          <div className='flex'>
            <LanguageDropdownMenu />
            {!isAuthenticated && (
              <div className='flex items-center divide-x text-white capitalize'>
                <Link to={path.register} className='px-3 hover:text-gray-200'>
                  {t('register')}
                </Link>
                <Link to={path.login} className='px-3 hover:text-gray-200'>
                  {t('log-in')}
                </Link>
              </div>
            )}
            {isAuthenticated && <UserDropdownMenu />}
          </div>
        </div>
        <div className='grid grid-cols-12 gap-2 sm:gap-4 mt-2'>
          <Link to={path.home} className='col-span-2 hidden lg:block'>
            <ShopeeLogo />
          </Link>
          <form className='col-span-10 lg:col-span-8' onSubmit={onSubmit}>
            <div className='bg-white p-1 flex items-center rounded-md'>
              <input
                type='text'
                placeholder={t('search-product')}
                className='text-black px-3 py-2 flex-grow border-none outline-none text-lg bg-transparent w-[80%] sm:w-auto'
                {...register('search')}
              />
              <button className='bg-orange h-10 w-10 sm:w-14 flex justify-center items-center text-white rounded-md group hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <ShoppingCart classNames='col-span-2 lg:col-span-1' />
        </div>
      </div>
    </div>
  )
}
