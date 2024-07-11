import React from 'react'

const PreLoaderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-dark-1 p-10 w-[100vw] h-[100vh] fixed top-0 left-0 z-50">
      <div className='flex flex-1'>
        <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
      </div>

      <p className="small-medium lg:base-medium py-5 text-light-4">
        © {new Date().getFullYear()} SNAPGRAM
      </p>
    </div>
  );
}

export default PreLoaderPage