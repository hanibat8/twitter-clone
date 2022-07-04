import React from 'react'
import Image from 'next/image';
import {useAddPostMutation} from '../../api/apiSlice';
import { useDispatch } from 'react-redux'
import { useSession} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit';

interface Props{
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const schema=yup.object().shape({
  tweet:yup.string().min(1).max(100).required()
})

type FormData = {
  tweet: string;
};

const AddPostForm:React.FC<Props>=({setIsModalOpen})=>{

  const {data:session,status}=useSession();
  const dispatch = useDispatch();

  const [addPost]=useAddPostMutation();

  const {register ,handleSubmit, formState: { errors }}=useForm<FormData>({
    resolver:yupResolver(schema)
  });

  const onSubmitHandler=(
    handleSubmit(async data=>{
    console.log(data);
    /*dispatch(
      postAdded({
        id:nanoid(),
        content:data.tweet
      })
    )*/
    setIsModalOpen(false);
    await addPost(data);
  }))

  return (
   <form className='w-full  text-black' onSubmit={onSubmitHandler}>
    <div className='flex items-start gap-x-2'>
      {session?.user?.image && <Image className='rounded-full' src={session?.user?.image!} width={50} height={50}/>}
       <textarea
          {...register('tweet')} name='tweet'
          placeholder='Whats happening?'
          className='w-full h-20  p-2'
         
        />
    </div>
    <p className='mt-2 text-red-700 ml-12'>{errors.tweet?.message}</p>
    <div className='flex self-end'>
      <button className='bg-blue-500 mt-4 ml-auto rounded-3xl text-white py-2 px-8 hover:bg-blue-400 ' onClick={onSubmitHandler}>Post tweet</button>
    </div>
   </form>
  )
}

export default AddPostForm;