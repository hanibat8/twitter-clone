/* eslint-disable jsx-a11y/alt-text */
import React,{useRef} from 'react'
import { v4 as uuid } from 'uuid';
import { useSession} from 'next-auth/react';
import Image from 'next/image';

import { useReplyToTweetMutation } from './postsSlice';

const PostReplyForm = ({postId,image,creatorId,name}) => {

  const {data:session,}=useSession();
  const unique_id = uuid();

  let imgSrc=session?.user?.image ?? '/Portrait_Placeholder.png'; 

  //console.log(creatorId)

  const replyRef=useRef(null);
  const [replyToTweet]=useReplyToTweetMutation();

  const onReplyBtnClickHandler=(e)=>{
    e.preventDefault();
    if(!replyRef.current.value)
      return;
    let reply=replyRef.current.value;
    replyRef.current.value='';
    //console.log(reply,creatorId)

    replyToTweet({postId,id:unique_id,reply,image,name})
  }

  return (
    <form onSubmit={onReplyBtnClickHandler} className='flex flex-col p-6 border-b-2 border-stone-100'>
        <div className='flex items-start gap-x-2 '>
            <Image src={imgSrc} width={45} height={45} className='rounded-full cursor-pointer'/>
            <input name='reply' type={'text'} ref={replyRef} placeholder='Tweet your reply' className='py-6 w-full text-lg placeholder:text-lg'/>
        </div>
        <button type='submit' onClick={onReplyBtnClickHandler} className=' ml-auto px-6 py-2 border-primary-blue hover:bg-blue-400  rounded-full bg-primary-blue text-white'>Reply</button>
    </form>
  )
}

export default PostReplyForm