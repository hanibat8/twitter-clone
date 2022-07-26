import React from 'react'
import { toggleModal } from './modalSlice';
import { RootState } from '../app/store';
import { useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema=yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(4).max(15).required()
})

type FormData = {
    email: string;
    password: string;
};
  
const SignInForm=()=>{

    const {register ,handleSubmit, formState: { errors }}=useForm<FormData>({
        resolver:yupResolver(schema)
    });

    const dispatch=useDispatch();
  
    const onSubmitHandler=(handleSubmit(data=>{
        console.log(data);
        dispatch(toggleModal(false));
        //setIsModalOpen(false)
    }))
    
    return (
        <>
            <h2  className='px-8 text-2xl text-black'>Sign In</h2>
            <form className='px-8 flex flex-col text-black' onSubmit={onSubmitHandler}>
                <input {...register('email')} type='text' className=' p-2 block mt-6 w-full rounded-sm text-zinc-900 border-2 border-slate-200' placeholder='Email' name='email'/>
                <p className='mb-6 text-red-700'>{errors.email?.message}</p>
                <input {...register('password')} type='password' className=' p-2 block w-full rounded-sm text-zinc-900 border-2 border-slate-200' placeholder='Password' name='password'/>
                <p className=' text-red-700'>{errors.password?.message}</p>
                <button className='bg-blue-500 mt-8 self-center rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400 ' onClick={onSubmitHandler}>Sign In</button>
            </form>
        </>
    )
}

export default SignInForm;

//e:React.FormEvent<HTMLFormElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>