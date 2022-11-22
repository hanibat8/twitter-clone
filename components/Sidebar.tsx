import React, { useState } from 'react'
import Link from 'next/link'
import { toggleModal } from './modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { FiTwitter,FiHome,FiBell,FiMessageSquare,FiUser } from "react-icons/fi";
import { signOut} from 'next-auth/react';
import { useGetNotificationsQuery } from './Notifications/notificationsSlice'

const Sidebar=()=>{

  const [showNotifications,setShowNotifications]=useState(true);
  
  const currentUser=useSelector((state:RootState)=>state.currentUser);
  const dispatch=useDispatch();

  const {data:notifications,isLoading,error,isError} = useGetNotificationsQuery(currentUser.userId);

  const onClickHandler=()=>{
    dispatch(toggleModal(true));
  }

  const onClickNotificationsHandler=()=>{
    setShowNotifications(false)
  }
  
console.log(notifications)

  return (
    <div className='h-screen flex flex-col items-start pt-8 basis-[22%] '>
        <FiTwitter color='#3b82f6' size={50} className='fill-blue-500 mb-5  hover:bg-slate-200 cursor-pointer	'/>
        <div>
          <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer'>
              <Link href="/">
                <a className='flex'>
                  <FiHome color='rgba(0,0,0,.7)' size={35} className=' inline-block  mr-2'/>
                  <span className=' text-lg'>Home</span>
                </a>
              </Link>
          </div>
          <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer '>
            <Link href="/notifications">
              <a onClick={onClickNotificationsHandler} className='flex'>
              <div className='relative'>
                {notifications?.length>0 && showNotifications && <span className=' text-xs right-1 rounded-full h-5 w-5 flex justify-center align-middle bg-red-600 absolute font-bold text-white'>{notifications?.length}</span>}
                <FiBell color='rgba(0,0,0,.7)' size={35} className=' inline-block mr-2'/>
              </div>
              <span className='text-lg'>Notifications</span>
              </a>
            </Link>
          </div>
          <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer '>
              <FiMessageSquare color='rgba(0,0,0,.7)' size={35} className=' inline-block mr-2'/>
              <span className='text-lg'>Messages</span>
          </div>
          <div className=' hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer '>
              <Link href="/profile">
                <a className='flex'>
                  <FiUser color='rgba(0,0,0,.7)' size={35} className=' inline-block mr-2'/>
                  <span className='text-lg'>Profile</span>
                </a>
              </Link>
          </div>
          <button onClick={onClickHandler} className=' cursor-pointer bg-primary-blue rounded-3xl text-white py-2 px-[96px] hover:bg-blue-400 self-start'>Tweet</button>
          <button onClick={(e)=>{e.preventDefault(); signOut()}} className=' cursor-pointer bg-primary-blue rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400 mt-4 self-start'>Sign out</button>
        </div>

    </div>
  )
}

export default Sidebar;
