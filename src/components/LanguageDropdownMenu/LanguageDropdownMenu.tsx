import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'
import Popover from '../Popover'

export default function LanguageDropdownMenu() {
  const { i18n } = useTranslation()
  const currentLng = locales[i18n.language as keyof typeof locales]
  const changeLanguage = (lng: 'en' | 'vi') => () => {
    i18n.changeLanguage(lng)
  }
  return (
    <Popover
      childrenClasses='flex flex-row items-center text-white hover:text-gray-200 cursor-pointer'
      renderPopover={
        <div className='bg-white flex flex-col shadow-md text-gray-600 text-[20px]'>
          <button onClick={changeLanguage('vi')} className='py-2 px-5 hover:bg-gray-200 transition-all'>
            Tiếng Việt
          </button>
          <button onClick={changeLanguage('en')} className='py-2 px-5 hover:bg-gray-200 transition-all'>
            English
          </button>
        </div>
      }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-4 h-4'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
        />
      </svg>
      <span className='mx-1'>{currentLng}</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-4 h-4'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
      </svg>
    </Popover>
  )
}
