export default function ServerError() {
  return (
    <div className='w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0'>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center'>
        <p className='text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300'>500</p>
        <p className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2'>Server Error</p>
        <p className='text-lg md:text-xl lg:text-2xl text-gray-500 my-8'>
          Whoops, something went wrong on our servers.
        </p>
        <a href='/' className='text-lg md:text-xl text-white my-8 py-2 px-5 bg-orange rounded-md hover:bg-orange/90'>
          Go to home page
        </a>
      </div>
    </div>
  )
}
