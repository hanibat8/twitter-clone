import React from 'react'
import { useSelector } from 'react-redux'
import {useGetPostsQuery} from '../../api/apiSlice';
import Post from './Post';

interface State{
    posts:{
        id: string;
        title: string;
        content: string;
    }[]
}

const PostsList = () => {
  //const posts = useSelector((state:State) => state.posts)
  const {data:posts,isLoading,error,isError} = useGetPostsQuery();
  console.log(posts)
  /*const renderedPosts = posts.map(post => (
    <Post {...post}/>
  ))*/

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      
    </section>
  )
}

export default PostsList;