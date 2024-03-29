import React from 'react'
import Image from 'next/image';
import { toggleModal } from '../modalSlice';
import { useAddPostMutation } from '../Posts/postsSlice';
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../../app/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//import { postAdded } from './postsSlice'
//import { nanoid } from '@reduxjs/toolkit';

const schema=yup.object().shape({
  tweet:yup.string().min(1).max(100).required()
})

type FormData = {
  tweet: string;
};

const AddPostForm=()=>{

  const currentUser=useSelector((state:RootState)=>state.currentUser);
  const dispatch = useDispatch();

  const [addPost]=useAddPostMutation();

  //console.log(session?.userId);

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
    dispatch(toggleModal(false))
    addPost({'creatorId':currentUser.userId,
            'name':currentUser?.name,
            'email':currentUser?.email,
            'image':currentUser?.image,
            ...data});
  }))

  return (
   <form className='w-full  text-black' onSubmit={onSubmitHandler}>
    <div className='flex items-start gap-x-2'>
      {currentUser.image && <Image alt='user image' className='rounded-full' src={currentUser.image!} width={50} height={50}/>}
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