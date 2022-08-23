import React from 'react'
import Image from 'next/image';
import { FaRetweet } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsFillHeartFill,BsHeart } from 'react-icons/bs'
import { useDeletePostMutation,
          useLikeTweetMutation,
          useRetweetTweetMutation } from './postsSlice';

interface PropsType{
    id: string;
    tweet: string;
    timestamp: string;
    name:string;
    image:string;
    creatorId:string;
    currUserId:string;
    likedBy:string[];
    retweetedBy:string[]
}

const isLikedByUser=(likedBy:string[],creatorId:string)=>likedBy?.includes(creatorId);

const isRetweetedByUser=(retweetedBy:string[],creatorId:string)=>retweetedBy?.includes(creatorId);

const Post:React.FC<PropsType>=({id,timestamp,tweet,name,image,creatorId,currUserId,likedBy,retweetedBy}) =>{
  
  const [deletePost]=useDeletePostMutation();
  const [likeTweet]=useLikeTweetMutation();
  const [retweetTweet]=useRetweetTweetMutation();

  //console.log(id,currUserId)

  const onClickLikeBtnHandler=(id:string)=>{
    console.log('here');
    likeTweet({id,currUserId})
  }

  const onClickRetweetBtnHandler=(id:string)=>{
    console.log('here');
    retweetTweet({id,currUserId})
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
          {isLikedByUser(likedBy,currUserId) ? <BsFillHeartFill fill='red' onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400'/>
                                             : <BsHeart onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400 border-gray-500'/>}
          {creatorId!==currUserId ? isRetweetedByUser(retweetedBy,currUserId) ? <FaRetweet fill='#5CC777' onClick={onClickRetweetBtnHandler.bind(null,id)} size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>:
                                                                                <FaRetweet onClick={onClickRetweetBtnHandler.bind(null,id)} size={20} className='mr-2 cursor-pointer hover:text-slate-400'/> :''}
          {creatorId===currUserId ? <AiOutlineDelete size={20} className='mr-2 cursor-pointer hover:text-slate-400' onClick={()=>{console.log(id); deletePost(id)}}/>:''}
        </div>
      </div>
    </article>
  )
}

export default Post;
