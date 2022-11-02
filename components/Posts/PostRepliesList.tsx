import React from 'react'

import dynamic from "next/dynamic";
const Post = dynamic(() => import("./Post"))

interface PropsType{
  replies?:{id:string,image:string,name:string,reply:string}[]
}

const mapPostReplies=(replies:{id:string,image:string,name:string,reply:string}[])=>{

  return replies?.map((reply:any) => (
        <Post id={reply.id}
        name={reply.name}
        image={reply.image}>
            <p>{reply.reply}</p>
        
        </Post>
  ))
};

const PostRepliesList:React.FC<PropsType>= ({replies}) => {

  let content=mapPostReplies(replies)
  console.log(content,replies);
  return (
    <section className="posts-list">
      {content}
    </section>
  )
}

export default PostRepliesList;
