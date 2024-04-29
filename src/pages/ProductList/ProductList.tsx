import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'

export default function ProductList() {
  return (
    <div className='bg-gray-200 py-6'>
      <div className="max-w-7xl mx-auto px-4'">
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3 px-2'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              {Array(30)
                .fill(0)
                .map((_, idx) => (
                  <div className='col-span-1' key={idx}>
                    <ProductItem />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
