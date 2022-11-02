import React from 'react'
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai';
import { useDeletePostMutation } from './postsSlice';
import LikePostsAction from './LikePostsAction';
import RetweetPostsAction from './RetweetPostsAction';

const PostActions = ({id,creatorId,currUserId,likedBy,retweetedBy}) => {

  //console.log(id,creatorId,currUserId,likedBy,retweetedBy)
  
    const [deletePost]=useDeletePostMutation();
    
    return (
        <div className='flex justify-around mt-3'>
          <FiMessageCircle size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
          <LikePostsAction likedBy={likedBy} currUserId={currUserId} id={id}/>
          {creatorId!==currUserId &&
            <RetweetPostsAction retweetedBy={retweetedBy} currUserId={currUserId} id={id}/>}
          {creatorId===currUserId && 
            <AiOutlineDelete size={20} className='mr-2 cursor-pointer hover:text-slate-400' 
            onClick={()=>{console.log(id); deletePost(id)}}/>}
        </div>
  )
}

export default PostActions