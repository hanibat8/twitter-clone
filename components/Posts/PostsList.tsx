import React from 'react'
//import { useSelector } from 'react-redux'
import {useGetPostsQuery} from '../apiSlice';
import dynamic from "next/dynamic";

const LoadingSpinner = dynamic(() => import("../LoadingSpinner"))
const PostRetweetedPostsList = dynamic(() => import("./PostRetweetPostsList"))

interface PropsType{
  currUserId:string|any
}

const PostsList:React.FC<PropsType>= ({currUserId}) => {

  //const posts = useSelector((state:State) => state.posts)
  const {data:posts,isLoading,error,isError} = useGetPostsQuery(currUserId);
  //console.count('Rerender PostList');
  //console.log(posts,isLoading);
 
  let content;

  if(isLoading){
    content=<LoadingSpinner/>
  }

  else if(isError){
      let a:any=error
      content=<p color='red'>{a?.message}</p>
  }

  else if(posts){
    console.log(posts);
    content=<PostRetweetedPostsList posts={posts} currUserId={currUserId}/>
  }

  return (
    <section className="posts-list">
    {content}
    </section>
  )
}

export default PostsList;