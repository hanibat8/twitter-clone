import React from 'react'

import dynamic from "next/dynamic";
const Post = dynamic(() => import("./Post"))

interface PropsType{
  replies?:{id:string,image:string,name:string,reply:string}[]
}

const mapPostReplies=(replies:{id:string,image:string,name:string,reply:string}[])=>{

  return replies?.map((reply:any) => (
        <Post key={reply.id} id={reply.id}
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
      <h2 className='p-2 px-4 mb-5 font-bold text-xl'>Replies</h2>
      {content}
    </section>
  )
}

export default PostRepliesList;
