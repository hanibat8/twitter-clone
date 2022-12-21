import React from 'react'
import { RootState } from '../../app/store';
import {useSelector } from 'react-redux';
import { BsFillHeartFill,BsHeart } from 'react-icons/bs'
import { useLikeTweetMutation } from './postsSlice';
import { useAddNotificationMutation } from '../Notifications/notificationsSlice';

interface PropsType{
    id: string;
    likedBy:string[];
    creatorId:string,
}

const isLikedByUser=(likedBy:string[],creatorId:string)=> likedBy?.includes(creatorId);

const LikePostsAction:React.FC<PropsType> = ({likedBy,id, creatorId}) => {

    const [likeTweet]=useLikeTweetMutation();
    const [addNotification]=useAddNotificationMutation();
    const currentUser=useSelector((state:RootState)=>state.currentUser);

    const onClickLikeBtnHandler=(id:string,e)=>{
        //console.log('here',e);
        e.preventDefault();
        e.stopPropagation();
        //e.nativeEvent.stopImmediatePropagation();
        likeTweet({id, currUserId:currentUser.userId })

        console.log(creatorId!=currentUser.userId)
        !isLikedByUser(likedBy,currentUser.userId) && creatorId!=currentUser.userId && addNotification({'postId':id,'postCreatorId':creatorId,
            'message':`${currentUser.name} liked your tweet`});
    }

    console.log(isLikedByUser(likedBy,currentUser.userId),likedBy,currentUser.userId)

    return (
        <span className='flex'>
            {isLikedByUser(likedBy,currentUser.userId) ? 
                <BsFillHeartFill fill='red' onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400'/>
                : <BsHeart onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400 border-gray-500'/>}
                <span>{likedBy?.length > 0 ?likedBy?.length:''}</span>
        </span>
    )
}

export default LikePostsAction