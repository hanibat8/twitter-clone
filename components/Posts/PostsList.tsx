import React from 'react'
//import { useSelector } from 'react-redux'
import {useGetPostsQuery} from './postsSlice';

import dynamic from "next/dynamic";
import withDataListHOC from '../withDataListHOC';
const Post = dynamic(() => import("./Post"))

interface PropsType{
  content?:any
}

const mapPosts=(posts:any,currUserId:string)=>{

  return posts?.map((post:any) => (
    <Post key={post.id} currUserId={currUserId} {...post}/>
  ))
};

const PostsList:React.FC<PropsType>= ({content}) => {

  return (
    <section className="posts-list">
      {content}
    </section>
  )
}

export default withDataListHOC(PostsList,useGetPostsQuery,mapPosts);