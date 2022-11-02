import React from 'react'
import Image from 'next/image';

const Post = ({id,name,image,children}) => {

    console.log(children,image)
    
    return (
    <article className="border-b-2 border-stone-100 flex items-start gap-x-2 p-4 hover:cursor-pointer" key={id}>
      <Image className='rounded-full cursor-pointer' src={image} width={45} height={45}/>      
      <div className='w-full'>
          <div className='flex'>
            <h4 className='font-bold cursor-pointer'>{name}</h4>
            <h5 className='ml-2 text-slate-500'>{'@__'+name}</h5>
          </div>
          
          {children}
         
      </div>
    </article>
  )
}

export default Post