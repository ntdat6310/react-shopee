import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from 'src/apis/auth.api'
import path from 'src/constants/path'
import { PurchaseStatus } from 'src/constants/purchaseStatus.enum'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'
import Popover from '../Popover'
import { useTranslation } from 'react-i18next'

export default function UserDropdownMenu() {
  const { t } = useTranslation('header')
  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: logout,
    onSuccess(data) {
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', PurchaseStatus.inCart] })
      toast.success(data.data.message, {
        autoClose: 500
      })
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <Popover
      renderPopover={
        <div className='bg-white flex flex-col shadow-md items-start text-gray-600 text-[20px] min-w-[150px] '>
          <Link className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all' to={path.profile}>
            {t('profile')}
          </Link>
          <Link to={path.historyPurchase} className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all'>
            {t('order')}
          </Link>
          <button className='py-2 px-4 w-full text-left hover:bg-gray-200 transition-all' onClick={handleLogout}>
            {t('log-out')}
          </button>
        </div>
      }
    >
      <div className='ml-5 flex items-center text-white hover:text-gray-300 cursor-pointer'>
        <div className='w-7 h-7 flex-shrink-0'>
          <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='w-full h-full rounded-full object-cover' />
        </div>
        <div className='ml-2 truncate max-w-[120px]'>
          {profile?.email ? `${profile?.email.substring(0, profile?.email.indexOf('@'))}` : 'user'}
        </div>
      </div>
    </Popover>
  )
}
