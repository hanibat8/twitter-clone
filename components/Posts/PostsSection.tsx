import React from 'react'
import { useSession} from 'next-auth/react';
import Sidebar from '../Sidebar';
import Search from '../Search';
import PostsList from '../Posts/PostsList';
import AddPostForm from '../Posts/AddPostForm';
import Modal from '../Modal';
import UsersList from '../UsersList';

const PostsSection=()=>{

    const {data:session,status}=useSession();
    return (
        <>
            <Modal>
            <AddPostForm />
            </Modal>
            <div className='flex mx-32 gap-x-5'>
            <Sidebar/>
            <main className='mr-5 pt-8 flex-1 basis-[45%] border-x-2 border-stone-100 min-h-screen'>
                <PostsList currUserId={session?.userId}/>
            </main>
            <div className='basis-[25%]'>
            <Search/>
            <UsersList currentUserId={session?.userId}/>
            </div>
            </div>
        </>
    )
}

export default PostsSection