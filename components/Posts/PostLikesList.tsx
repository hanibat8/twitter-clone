import React from 'react'
import {useGetPostsQuery} from './postsSlice';

import dynamic from "next/dynamic";
import withDataListHOC from '../withDataListHOC';

const Post = dynamic(() => import("./Post"))

interface PropsType{
  content:any
}

const mapPosts=(posts:any,currUserId:string)=>{
  //console.count('here')
  return posts?.filter((post)=> post?.likedBy?.includes(currUserId)).map((post:any) => (
    <Post key={post.id} currUserId={currUserId} {...post}/>
  ))
};

const PostRetweetedPostsList:React.FC<PropsType>= ({content}) => {
 
    return (
        <section className="posts-list">
          {content}
        </section>
  )
}

export default withDataListHOC(PostRetweetedPostsList,useGetPostsQuery,mapPosts);