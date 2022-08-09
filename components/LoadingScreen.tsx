import React from 'react'
import { FiTwitter } from "react-icons/fi";

function LoadingScreen() {
  return (
    <div className='flex h-screen justify-center flex-col place-items-center'>
        <FiTwitter color='rgb(59 130 246)' size={50} className='fill-blue-500 '/>
        <span className='font-medium '>Loading...</span>
    </div>
  )
}

export default LoadingScreen