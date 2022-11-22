import React from 'react'
import {useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai';
import { useDeletePostMutation } from './postsSlice';
import LikePostsAction from './LikePostsAction';
import RetweetPostsAction from './RetweetPostsAction';

const PostActions = ({id,creatorId,likedBy,retweetedBy}) => {

  //console.log(id,creatorId,currUserId,likedBy,retweetedBy)
  
    const currentUser=useSelector((state:RootState)=>state.currentUser);
    const [deletePost]=useDeletePostMutation();
    
    return (
        <div className='flex justify-around mt-3'>
          <FiMessageCircle size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
          <LikePostsAction likedBy={likedBy} id={id} creatorId={creatorId}/>
          {creatorId!==currentUser.userId &&
            <RetweetPostsAction retweetedBy={retweetedBy} id={id} creatorId={creatorId}/>}
          {creatorId===currentUser.userId && 
            <AiOutlineDelete size={20} className='mr-2 cursor-pointer hover:text-slate-400' 
            onClick={()=>{console.log(id); deletePost(id)}}/>}
        </div>
  )
}

export default PostActions