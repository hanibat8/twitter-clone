import React from 'react'
import Image from 'next/image';
import { FaRetweet,FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import {AiOutlineDelete} from 'react-icons/ai';
import { useDeletePostMutation,useLikeTweetMutation } from '../../services/apiSlice';

interface PropsType{
    id: string;
    tweet: string;
    timestamp: string;
    name:string;
    image:string;
    creatorId:string;
    currUserId:string;
}

const Post:React.FC<PropsType>=({id,timestamp,tweet,name,image,creatorId,currUserId}) =>{
  
  const [deletePost]=useDeletePostMutation();
  const [likeTweet]=useLikeTweetMutation();

  console.log(id,currUserId)

  const onClickLikeBtnHandler=(id:string)=>{
    console.log('here');
    likeTweet({id,currUserId})
  }

  return (
    <article className="border-b-2 border-stone-100 flex items-start gap-x-2 p-4 py-4" key={id}>
      <Image className='rounded-full cursor-pointer' src={image} width={45} height={45}/>
      <div className='w-full'>
        <div className='flex'>
          <h4 className='font-bold cursor-pointer'>{name}</h4>
          <h5 className='ml-2 text-slate-500'>{'@__'+name}</h5>
        </div>
        <p>{tweet}</p>
        <div className='flex justify-around'>
          <FiMessageCircle size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
          <FaRegHeart onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400'/>
          {creatorId!==currUserId ? <FaRetweet size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>:''}
          {creatorId===currUserId ? <AiOutlineDelete size={20} className='mr-2 cursor-pointer hover:text-slate-400' onClick={()=>{console.log(id); deletePost(id)}}/>:''}
        </div>
      </div>
    </article>
  )
}

export default Post;
