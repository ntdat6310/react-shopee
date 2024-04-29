import Button from 'src/components/Button/Button'

export default function SortProductList() {
  return (
    <div className='flex items-center flex-wrap px-2 py-3 rounded-sm bg-gray-300 gap-3'>
      <div className=''>Sắp xếp theo</div>
      <Button className='bg-orange shadow-sm capitalize px-4 text-white rounded-sm h-8 text-sm'>Phổ biến</Button>
      <Button className='bg-white capitalize px-4 text-black rounded-sm h-8 text-sm shadow-sm'>Mới nhất</Button>
      <Button className='bg-white capitalize px-4 text-black rounded-sm h-8 text-sm shadow-sm'>Bán chạy</Button>
      <select className='h-8 px-4 outline-none rounded-sm text-sm'>
        <option value=''>Giá</option>
        <option value='price:asc' className=''>
          Giá: Thấp đến cao
        </option>
        <option value='price:desc'>Giá: Cao đến thấp</option>
      </select>
    </div>
  )
}
