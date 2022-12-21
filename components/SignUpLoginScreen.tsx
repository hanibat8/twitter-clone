import React from 'react'
import { toggleModal } from './modalSlice';
import { useDispatch } from 'react-redux';
import { signIn} from 'next-auth/react';
import { FiTwitter } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function SignUpLoginScreen() {
    const dispatch=useDispatch();

    const onClickHandler=()=>{
        dispatch(toggleModal(true));
    }

    return (
        <div className='flex h-screen w-screen font-serif'>
            <div className='flex-1 bg-blue-500 relative'>
            <FiTwitter color='white' size={300} className='fill-white inline-block absolute top-2/4 left-2/4 -translate-y-1/2	-translate-x-1/2	'/>
            </div>
            <div className='flex-1 pl-10 flex flex-col justify-evenly'>
            <FiTwitter  color='rgb(59 130 246)' size={50} className='fill-blue-500 '/>
            <h1 className='text-7xl font-bold'>Happening now</h1>      
            <div>
                <h2 className='text-4xl mb-11'>Join Twitter today.</h2>
                <button className='bg-white rounded-3xl text-black py-1 px-16 hover:bg-slate-200' onClick={(e)=>{e.preventDefault(); signIn('google')}}><FcGoogle size={30} className='inline-block mr-2'/>Sign up with Google</button>
                <p className='text-gray-300	text-2xl my-3 ml-36'>or</p>
                <button className='bg-blue-500 rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400' onClick={onClickHandler}>Sign up with email</button>
            </div>
            <div>
                <h2 className='mb-4'>Already have an account?</h2>
                <button className='rounded-3xl text-blue-500 py-2 px-[130px] border-[1px] border-opacity-20 hover:bg-slate-900' onClick={onClickHandler}>Sign in</button>
            </div>
        </div>
        </div>
  )
}
