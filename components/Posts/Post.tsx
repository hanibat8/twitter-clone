import React from 'react'
import Image from 'next/image';
import { FaRetweet,FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { useSession} from 'next-auth/react';

interface PropsType{
    id: string;
    title: string;
    content: string;
}

const Post:React.FC<PropsType>=({id,content}) =>{

  const {data:session,status}=useSession();

  return (
    <article className="border-b-2 border-stone-100 flex items-start gap-x-2 p-4 py-4" key={id}>
      {session?.user?.image && <Image className='rounded-full cursor-pointer' src={session?.user?.image!} width={45} height={45}/>}
      <div className='w-full'>
        <div className='flex'>
          {session?.user?.name && <h4 className='font-bold cursor-pointer'>{session?.user?.name}</h4>}
          {session?.user?.name && <h5 className='ml-2 text-slate-500'>{'@__'+session?.user?.name}</h5>}
        </div>
        <p>{content}</p>
        <div className='flex justify-around'>
          <FiMessageCircle size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
          <FaRegHeart size={18} className='mr-2 cursor-pointer hover:text-slate-400'/>
          <FaRetweet size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
        </div>
      </div>
    </article>
  )
}

export default Post;
