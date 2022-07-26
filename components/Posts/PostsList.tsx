import React from 'react'
import { useSelector } from 'react-redux'
import {useGetPostsQuery} from '../../services/apiSlice';
import LoadingSpinner from '../LoadingSpinner';
import Post from './Post';

interface PropsType{
  followingArr:string[]|any
}

const mapPosts=(posts:any)=>{
  //console.count('here')
  return posts?.map((post:any) => (
    <Post key={post.id} {...post}/>
  ))
};

const PostsList:React.FC<PropsType>= ({followingArr}) => {

  //const posts = useSelector((state:State) => state.posts)
  const {data:posts,isLoading,error,isError} = useGetPostsQuery(followingArr);
  //console.count('Rerender PostList');
  //console.log(posts,isLoading);
 
  let content;

  //do check this later
  content=React.useMemo(()=>mapPosts(posts), [posts]);

  if(isLoading){
    content=<LoadingSpinner/>
  }

  else if(isError){
      let a:any=error
      content=<p color='red'>{a?.message}</p>
  }

  else if(posts){
    if(posts.length<=0){
      console.log('aye')
      content=<p color='black'>No tweets yet</p>;
      return null;
    }

    //console.count('aha');
    //content=mapPosts(posts);
  }

  return (
    <section className="posts-list">
    {content}
    </section>
  )
}

export default PostsList;