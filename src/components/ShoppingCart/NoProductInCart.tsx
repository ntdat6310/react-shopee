export default function NoProductInCart() {
  return (
    <div className='flex flex-col items-center p-4 md:p-8'>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYm5wwudlzSOnxFI4qsiU3icSUr-2FOKXvIbErHl9S9DjpmFp9xK0aMO3gFRPZjF23VA&usqp=CAU'
        alt='img-no-product-in-cart'
        className='w-40 h-40'
      />
      <div className='capitalize mt-2 text-center'>Không có sản phẩm trong giỏ hàng</div>
    </div>
  )
}
