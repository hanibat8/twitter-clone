import React from 'react'
import { FiSearch } from "react-icons/fi";

export default function Search() {
  return (
    <>
     <form className='pt-8 h-fit flex-1'>
      <span className='flex border-2 rounded-lg border-[#55555582]'>
        <FiSearch color='#55555582' size={25} className='inline-block self-center'/>
        <input className='inline-block text-[#555] p-2 w-full' type="search" placeholder='Search Twitter'/>
      </span>
    </form>
    </>
  )
}
