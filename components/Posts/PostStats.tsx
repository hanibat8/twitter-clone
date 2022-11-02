import React from 'react'

const PostStats = ({likedBy,retweetedBy}) => {

    let likedByAmount=likedBy && likedBy.length;
    let retweetedByAmount=retweetedBy && retweetedBy.length;

  return (
    <div className='flex border-y-2 border-gray-100'>
       {retweetedByAmount ? <p className='py-2 mr-4'><span className='font-semibold'>{retweetedByAmount }</span> Retweets</p>:<></>}
       {likedByAmount ? <p className='py-2 '><span className='font-semibold'>{likedByAmount}</span> Likes</p>:<></>}
    </div>
  )
}

export default PostStats