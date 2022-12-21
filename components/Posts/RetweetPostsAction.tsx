import React from 'react'
import { RootState } from '../../app/store';
import {useSelector } from 'react-redux';
import { FaRetweet } from "react-icons/fa";
import { useRetweetTweetMutation } from './postsSlice';
import { useAddNotificationMutation } from '../Notifications/notificationsSlice';

interface PropsType{
    id: string;
    retweetedBy:string[];
    creatorId:string,
}

const isRetweetedByUser=(retweetedBy:string[],creatorId:string)=>retweetedBy?.includes(creatorId);

const RetweetPostsAction:React.FC<PropsType> = ({retweetedBy,id,creatorId}) => {

    const [retweetTweet]=useRetweetTweetMutation();
    const [addNotification]=useAddNotificationMutation();
    const currentUser=useSelector((state:RootState)=>state.currentUser);

    const onClickRetweetBtnHandler=(id:string,e)=>{
        //console.log('here');
        e.preventDefault();
        e.stopPropagation();
        retweetTweet({id,currUserId:currentUser.userId})

        console.log(isRetweetedByUser(retweetedBy,currentUser.userId))
        !isRetweetedByUser(retweetedBy,currentUser.userId) && creatorId!=currentUser.userId  &&  addNotification({'postId':id,'postCreatorId':creatorId,
            'message':`${currentUser.name} retweeted your tweet`,});
      }

    return (
        <span className='flex'>
        {isRetweetedByUser(retweetedBy,currentUser.userId) ? 
                                  <FaRetweet fill='#5CC777' onClick={onClickRetweetBtnHandler.bind(null,id)} size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
                                : <FaRetweet onClick={onClickRetweetBtnHandler.bind(null,id)} size={20} className='mr-2 cursor-pointer hover:text-slate-400'/> }
        <span>{retweetedBy?.length > 0 ? retweetedBy?.length:''}</span>
      </span>
    )
}

export default RetweetPostsAction