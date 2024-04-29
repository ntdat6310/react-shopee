import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'

export default function ProductList() {
  return (
    <div className='bg-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-4 xl:px-10'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='hidden md:block md:col-span-3 px-2'>
            <AsideFilter />
          </div>
          <div className='col-span-12 md:col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn thoáng mát ATN027 - Áo thun An Cường' />
              </div>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nata' />
              </div>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn tho' />
              </div>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn tho' />
              </div>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn tho' />
              </div>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn tho' />
              </div>
              <div className='col-span-1'>
                <ProductItem description='Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn tho' />
              </div>
              {/* {Array(30)
                .fill(0)
                .map((_, idx) => (
                  <div className='col-span-1' key={idx}>
                    <ProductItem description='          Áo thun nam, áo phông nam tay ngắn cổ tròn chất cotton dày dặn thoáng mát ATN027 - Áo thun An Cường' />
                  </div>
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
