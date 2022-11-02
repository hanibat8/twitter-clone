import React from 'react'
import {useGetPostsQuery} from './postsSlice';

import dynamic from "next/dynamic";
import withDataListHOC from '../withDataListHOC';

import PostActions from './PostActions';
const Post = dynamic(() => import("./Post"))
const LinkCustom = dynamic(() => import("../LinkCustom"))

interface PropsType{
  content:any
}

const mapPosts=(posts:any,currUserId:string)=>{
  //console.count('here')
  return posts?.filter((post)=>post?.retweetedBy?.includes(currUserId)|| post?.creatorId===currUserId).map((post:any) => (
    <LinkCustom key={post.id} href={`post/${post.id}`}>
        <Post id={post.id}
        name={post.name}
        image={post.image}>
          
            <p>{post.tweet}</p>
            <PostActions id={post.id} 
              creatorId={post.creatorId} currUserId={currUserId}
              likedBy={post.likedBy} retweetedBy={post.retweetedBy} />
        
        </Post>
      </LinkCustom>
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