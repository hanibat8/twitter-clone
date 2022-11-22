import React,{FC} from 'react'
import { RootState } from '../app/store';
import {useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Search from './Search';
import AddPostForm from './Posts/AddPostForm';
import UsersList from './Users/UsersList';
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("./Modal"))

interface PropsType{
    children:any
}

const MainSection:FC<PropsType>=({children})=>{

    const currentUser=useSelector((state:RootState)=>state.currentUser);
    
    return (
        <>
            <Modal>
                <AddPostForm />
            </Modal>
            <div className='flex mx-32 gap-x-5'>
                <Sidebar/>
                <main className='mr-5 pt-8 flex-1 basis-[45%] border-x-2 border-stone-100 min-h-screen'>
                    {children}
                </main>
                <div className='basis-[25%]'>
                    <Search/>
                    <UsersList currUserId={currentUser?.userId} errMsg='No users found to follow'/>
                </div>
            </div>
        </>
    )
}

export default MainSection