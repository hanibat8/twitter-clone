import React from 'react'
import { FaRetweet } from "react-icons/fa";
import { useRetweetTweetMutation } from './postsSlice';

interface PropsType{
    id: string;
    currUserId:string;
    retweetedBy:string[];
}

const isRetweetedByUser=(retweetedBy:string[],creatorId:string)=>retweetedBy?.includes(creatorId);

const RetweetPostsAction:React.FC<PropsType> = ({retweetedBy,currUserId,id}) => {

    const [retweetTweet]=useRetweetTweetMutation();

    const onClickRetweetBtnHandler=(id:string,e)=>{
        //console.log('here');
        e.preventDefault();
        e.stopPropagation();
        retweetTweet({id,currUserId})
      }

    return (
        <span className='flex'>
        {isRetweetedByUser(retweetedBy,currUserId) ? 
                                  <FaRetweet fill='#5CC777' onClick={onClickRetweetBtnHandler.bind(null,id)} size={20} className='mr-2 cursor-pointer hover:text-slate-400'/>
                                : <FaRetweet onClick={onClickRetweetBtnHandler.bind(null,id)} size={20} className='mr-2 cursor-pointer hover:text-slate-400'/> }
        <span>{retweetedBy?.length > 0 ? retweetedBy?.length:''}</span>
      </span>
    )
}

export default RetweetPostsAction