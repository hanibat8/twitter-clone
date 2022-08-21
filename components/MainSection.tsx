import React,{FC} from 'react'
import { useSession} from 'next-auth/react';
import Sidebar from './Sidebar';
import Search from './Search';
import AddPostForm from './Posts/AddPostForm';
import UsersList from './UsersList';
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("./Modal"))

interface PropsType{
    children:any
}

const MainSection:FC<PropsType>=({children})=>{

    const {data:session,}=useSession();
    
    return (
        <>
            <Modal>
                <AddPostForm />
            </Modal>
            <div className='flex mx-32 gap-x-5'>
                <Sidebar/>
                {children}
                <div className='basis-[25%]'>
                    <Search/>
                    <UsersList currUserId={session?.userId} errMsg='No users found to follow'/>
                </div>
            </div>
        </>
    )
}

export default MainSection