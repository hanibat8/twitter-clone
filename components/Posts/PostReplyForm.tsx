import React,{useRef} from 'react'
import Image from 'next/image';

import { useReplyToTweetMutation } from './postsSlice';

const PostReplyForm = ({image,id,creatorId,name}) => {

  console.log(id,creatorId)

  const replyRef=useRef(null);
  const [replyToTweet]=useReplyToTweetMutation();

  const onReplyBtnClickHandler=(e)=>{
    e.preventDefault();
   if(!replyRef.current.value)
      return;
    let reply=replyRef.current.value;
    console.log(reply,creatorId)

    replyToTweet({id,creatorId,reply,image,name})
  }

  return (
    <form onSubmit={onReplyBtnClickHandler} className='flex flex-col p-6 border-b-2 border-stone-100'>
        <div className='flex items-start gap-x-2 '>
            <Image className='rounded-full cursor-pointer' src={image} width={45} height={45}/>
            <input name='reply' type={'text'} ref={replyRef} placeholder='Tweet your reply' className='py-6 w-full text-lg placeholder:text-lg'/>
        </div>
        <button type='submit' onClick={onReplyBtnClickHandler} className=' ml-auto px-6 py-2 border-primary-blue hover:bg-blue-400  rounded-full bg-primary-blue text-white'>Reply</button>
    </form>
  )
}

export default PostReplyForm