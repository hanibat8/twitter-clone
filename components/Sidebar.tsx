import React from 'react'
import Image from 'next/image';
import { FiTwitter,FiHome,FiBell,FiMessageSquare,FiUser } from "react-icons/fi";
import { useSession} from 'next-auth/react';
import { signOut} from 'next-auth/react';

const Sidebar:React.FC<{setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>}>=({setIsModalOpen})=>{
  
  const {data:session,}=useSession();
  
  return (
    <div className='h-screen flex flex-col items-start pt-8 basis-1/5 '>
        <FiTwitter color='rgb(59 130 246)' size={50} className='fill-blue-500 mb-5  hover:bg-slate-200 cursor-pointer	'/>
        <div>
        <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer'>
            <FiHome color='rgba(0,0,0,.7)' size={35} className=' inline-block  mr-2'/>
            <span className=' text-lg'>Home</span>
        </div>
        <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer '>
            <FiBell color='rgba(0,0,0,.7)' size={35} className=' inline-block mr-2'/>
            <span className='text-lg'>Notifications</span>
        </div>
        <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer '>
            <FiMessageSquare color='rgba(0,0,0,.7)' size={35} className=' inline-block mr-2'/>
            <span className='text-lg'>Messages</span>
        </div>
        <div className='flex hover:bg-slate-200 mb-8 py-4 px-2 rounded-full cursor-pointer '>
            <FiUser color='rgba(0,0,0,.7)' size={35} className=' inline-block mr-2'/>
            <span className='text-lg'>Profile</span>
        </div>
        <button onClick={()=>setIsModalOpen(true)} className=' cursor-pointer bg-blue-500 rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400 self-start'>Tweet</button>
        <button onClick={(e)=>{e.preventDefault(); signOut()}} className=' cursor-pointer bg-blue-500 rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400 self-start'>Sign out</button>'
        </div>
        <div className='flex hover:bg-slate-200 mt-auto pr-32 rounded-full cursor-pointer '>
            {session?.user?.image && <Image className='rounded-full' src={session?.user?.image!} width={50} height={50}/>}
            <p className='self-center ml-2'>{session?.user?.name}</p>
        </div>
    </div>
  )
}

export default Sidebar;

//<button onClick={(e)=>{e.preventDefault(); signOut()}} className='bg-blue-500 rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400 self-start'>Sign out</button>