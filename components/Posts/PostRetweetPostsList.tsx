import React from 'react'
import Post from './Post';

interface PropsType{
  currUserId:string|any,
  posts:Posts[]
}

interface Posts{
  id:string,
  timestamp:string,
  tweet:string,
  creatorId:string
}

const mapPosts=(posts:any,currUserId:string)=>{
  //console.count('here')
  return posts?.map((post:any) => (
    <Post key={post.id} currUserId={currUserId} {...post}/>
  ))
};

const PostRetweetedPostsList:React.FC<PropsType>= ({posts,currUserId}) => {

    let content;

    //do check this later
    //content=React.useMemo(()=>mapPosts(posts,currUserId), [posts]);

    console.log(posts);

    if(posts.length<=0){
      console.log('aye')
      content=<p color='black'>No tweets yet</p>;
      return null;
    }

    content=mapPosts(posts,currUserId);

    return (
        <section className="posts-list">
        {content}
        </section>
  )
}

export default PostRetweetedPostsList;