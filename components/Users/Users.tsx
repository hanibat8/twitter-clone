import React from 'react';
import { RootState } from '../../app/store';
import {useSelector } from 'react-redux';
import { useFollowUserMutation } from './usersSlice';
import { useAddNotificationMutation } from '../Notifications/notificationsSlice';
import Image from 'next/image';

interface PropsType{
    name: string;
    image: string;
    id:string;
}

const Users:React.FC<PropsType>=({name,image,id})=>{

    const [followUser]=useFollowUserMutation();
    const [addNotification]=useAddNotificationMutation();
    const currentUser=useSelector((state:RootState)=>state.currentUser);

    const onClickHandler=(id:string)=>{
        console.log(id)
        followUser({id,currUserId:currentUser.userId});
        addNotification({'postCreatorId':id,
            'message':`${currentUser.name} followed you`});
    }
    
    return (
        <div className='flex justify-between hover:bg-gray-200 py-2 px-4 cursor-pointer'>
            <div className='flex'>
                <Image alt='user-img' className='rounded-full cursor-pointer self-center' src={image} width={45} height={45}/>
                <div>
                    <h4 className='ml-2 font-bold cursor-pointer'>{name}</h4>
                    <h5 className='ml-2 text-slate-500'>{'@__'+name}</h5>
                </div>
            </div>
            <button onClick={onClickHandler.bind(null,id)} className='self-center cursor-pointer bg-black rounded-2xl text-white py-1 px-6 '>Follow</button>
        </div>
    )
}

export default Users;
