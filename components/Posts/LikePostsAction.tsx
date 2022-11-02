import React from 'react'
import { BsFillHeartFill,BsHeart } from 'react-icons/bs'
import { useLikeTweetMutation } from './postsSlice';

interface PropsType{
    id: string;
    currUserId:string;
    likedBy:string[];
}

const isLikedByUser=(likedBy:string[],creatorId:string)=>likedBy?.includes(creatorId);

const LikePostsAction:React.FC<PropsType> = ({likedBy,currUserId,id}) => {

    const [likeTweet]=useLikeTweetMutation();

    const onClickLikeBtnHandler=(id:string,e)=>{
        console.log('here',e);
        e.preventDefault();
        e.stopPropagation();
        //e.nativeEvent.stopImmediatePropagation();
        likeTweet({id,currUserId})
    }

    console.log(isLikedByUser(likedBy,currUserId),likedBy,currUserId)

    return (
        <span className='flex'>
            {isLikedByUser(likedBy,currUserId) ? 
                <BsFillHeartFill fill='red' onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400'/>
                : <BsHeart onClick={onClickLikeBtnHandler.bind(null,id)} size={18} className='mr-2 cursor-pointer hover:text-slate-400 border-gray-500'/>}
                <span>{likedBy?.length > 0 ?likedBy?.length:''}</span>
        </span>
    )
}

export default LikePostsAction