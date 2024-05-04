import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

export default function HistoryPurchase() {
  return (
    <div>
      <div className='overflow-auto py-1 bg-white px-4 rounded-md'>
        <div className='flex items-center justify-around flex-wrap min-w-[700px] py-2'>
          <NavLink
            to='#'
            className={({ isActive }) =>
              classNames({
                'border-b-2 border-orange py-2 px-3': isActive
              })
            }
          >
            Tất cả
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              classNames({
                'border-b-2 border-orange py-2 px-3': isActive
              })
            }
          >
            Chờ xác nhận
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              classNames({
                'border-b-2 border-orange py-2 px-3': isActive
              })
            }
          >
            Chờ lấy hàng
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              classNames({
                'border-b-2 border-orange py-2 px-3': isActive
              })
            }
          >
            Đang giao
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              classNames({
                'border-b-2 border-orange py-2 px-3': isActive
              })
            }
          >
            Đã giao
          </NavLink>
          <NavLink
            to='#'
            className={({ isActive }) =>
              classNames({
                'border-b-2 border-orange py-2 px-3': isActive
              })
            }
          >
            Đã hủy
          </NavLink>
        </div>
      </div>

      <div className='mt-4 py-8 min-h-[400px] bg-white overflow-auto rounded-md'>
        <div className='min-w-[700px]'>
          <div className='py-2 px-4 flex items-center gap-4'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex-shrink-0'>
              <img
                src='https://down-vn.img.susercontent.com/file/c5455ebbfbadc5c2c17023ebeabd1dc9_tn'
                alt=''
                className='w-full h-full object-cover rounded-md'
              />
            </div>
            <div className=''>
              <div className='line-clamp-2 max-w-[600px]'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sint et eos tenetur aspernatur voluptas.
                Quos nisi quaerat laborum iusto! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sint et
                eos tenetur aspernatur voluptas. Quos nisi quaerat laborum iusto!
              </div>
              <p className='mt-2 font-semibold'>x2</p>
            </div>
            <div className='self-end ml-auto'>
              <span className='text-xs line-through'>₫420.000</span>
              <span className='ml-4 text-orange'>₫320.000</span>
            </div>
          </div>

          <div className='mt-4 py-2 px-4 flex items-center gap-4'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex-shrink-0'>
              <img
                src='https://down-vn.img.susercontent.com/file/c5455ebbfbadc5c2c17023ebeabd1dc9_tn'
                alt=''
                className='w-full h-full object-cover rounded-md'
              />
            </div>
            <div className=''>
              <div className='line-clamp-2 max-w-[600px]'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sint et eos tenetur aspernatur voluptas.
                Quos nisi quaerat laborum iusto! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sint et
                eos tenetur aspernatur voluptas. Quos nisi quaerat laborum iusto!
              </div>
              <p className='mt-2 font-semibold'>x2</p>
            </div>
            <div className='self-end ml-auto'>
              <span className='text-xs line-through'>₫420.000</span>
              <span className='ml-4 text-orange'>₫320.000</span>
            </div>
          </div>

          <div className='mt-4 py-2 px-4 flex items-center gap-4'>
            <div className='w-20 h-20 border border-gray-300 rounded-md flex-shrink-0'>
              <img
                src='https://down-vn.img.susercontent.com/file/c5455ebbfbadc5c2c17023ebeabd1dc9_tn'
                alt=''
                className='w-full h-full object-cover rounded-md'
              />
            </div>
            <div className=''>
              <div className='line-clamp-2 max-w-[600px]'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sint et eos tenetur aspernatur voluptas.
                Quos nisi quaerat laborum iusto! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sint et
                eos tenetur aspernatur voluptas. Quos nisi quaerat laborum iusto!
              </div>
              <p className='mt-2 font-semibold'>x2</p>
            </div>
            <div className='self-end ml-auto'>
              <span className='text-xs line-through'>₫420.000</span>
              <span className='ml-4 text-orange'>₫320.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
