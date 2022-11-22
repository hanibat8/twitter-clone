import React from 'react'
//import { useSelector } from 'react-redux'
import {useGetPostsQuery} from './postsSlice';

import PostActions from './PostActions';
import withDataListHOC from '../withDataListHOC';

import dynamic from "next/dynamic";
const Post = dynamic(() => import("./Post"))
const LinkCustom = dynamic(() => import("../LinkCustom"))

interface PropsType{
  content?:any,
}

const mapPosts=(posts:any,currUserId:string,id)=>{
  return posts?.map((post:any) => (
    <LinkCustom key={post.id} href={`post/${post.id}`}>
      <Post id={post.id}
      name={post.name}
      image={post.image}>
        
          <p>{post.tweet}</p>
          <PostActions id={post.id} 
            creatorId={post.creatorId} 
            likedBy={post.likedBy} retweetedBy={post.retweetedBy} 
            />
      
      </Post>
    </LinkCustom>
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