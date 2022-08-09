import React from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../components/LoadingScreen';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import PostsList from '../components/Posts/PostsList';
import AddPostForm from '../components/Posts/AddPostForm';
import Modal from '../components/Modal';
import UsersList from '../components/UsersList';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';

export default function Profile() {
  const {data:session,status}=useSession();
  return (
  <>
    
    {!session && status==='unauthenticated' && 
      <SignUpLoginFullScreen/>
    }
    
    {!session && status==='loading' && 
      <LoadingScreen/>
    }
    
    {session && status==='authenticated' &&
      <>
        <Modal>
          <AddPostForm />
        </Modal>
        <div className='flex mx-32 gap-x-5'>
          <Sidebar/>
          <main className='mr-5 pt-8 flex-1 basis-[45%] border-x-2 border-stone-100 min-h-screen'>
            
          </main>
          <div className='basis-[25%]'>
          <Search/>
          <UsersList currentUserId={session?.userId}/>
          </div>
        </div>
      </>}

  </>
  )
}
