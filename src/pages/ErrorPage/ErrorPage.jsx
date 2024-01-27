import React from 'react'
import error from '../../assets/images/error.png'

const ErrorPage = () => {
  return (
    <div className='h-[100vh] flex flex-col items-center justify-center gap-5'>
        {/* <div className=' rounded-full bg-gray-200 flex justify-center items-center'> */}
            <img src={error} alt="" className='h-80' />
            {/* <span className='p-10 font-bold text-5xl text-white'>Error : 404</span> */}
        {/* </div> */}
        {/* <p className='font-medium text-3xl capitalize text-gray-400'>page not found</p> */}
    </div>
  )
}

export default ErrorPage