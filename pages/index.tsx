import type { NextPage } from 'next'
import { useState } from 'react';
import { FiTwitter } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signIn,signOut,useSession} from 'next-auth/react';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import PostsList from '../components/Posts/PostsList';
import SignInForm from '../components/SignInForm';
import AddPostForm from '../components/Posts/AddPostForm';
import Modal from '../components/Modal';

const Home: NextPage = () => {
  const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
  
  const {data:session,status}=useSession();
  console.log(session,status);

  return (
  <>
    {!session && status==='unauthenticated' && <>
      
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
        <SignInForm setIsModalOpen={setIsModalOpen}/>
      </Modal>
      
      <div className='flex h-screen w-screen font-serif'>
        <div className='flex-1 bg-blue-500 relative'>
          <FiTwitter color='white' size={300} className='fill-white inline-block absolute top-2/4 left-2/4 -translate-y-1/2	-translate-x-1/2	'/>
        </div>
        <div className='flex-1 pl-10 flex flex-col justify-evenly'>
          <FiTwitter  color='rgb(59 130 246)' size={50} className='fill-blue-500 '/>
          <h1 className='text-7xl font-bold'>Happening now</h1>      
          <div>
            <h2 className='text-4xl mb-11'>Join Twitter today.</h2>
            <button className='bg-white rounded-3xl text-black py-1 px-16 hover:bg-slate-200' onClick={(e)=>{e.preventDefault(); signIn('google')}}><FcGoogle size={30} className='inline-block mr-2'/>Sign up with Google</button>
            <p className='text-gray-300	text-2xl my-3 ml-36'>or</p>
            <button className='bg-blue-500 rounded-3xl text-white py-2 px-[90px] hover:bg-blue-400' onClick={()=>setIsModalOpen(true)}>Sign up with email</button>
          </div>
          <div>
            <h2 className='mb-4'>Already have an account?</h2>
            <button className='rounded-3xl text-blue-500 py-2 px-[130px] border-[1px] border-opacity-20 hover:bg-slate-900' onClick={()=>setIsModalOpen(true)}>Sign in</button>
        </div>
      </div>
    </div>
    </>}
    
    {!session && status==='loading' && <div className='flex h-screen justify-center flex-col place-items-center'>
        <FiTwitter color='rgb(59 130 246)' size={50} className='fill-blue-500 '/>
        <span className='font-medium '>Loading...</span>
      </div>}
    
    {session && status==='authenticated' &&
    <>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
        <AddPostForm setIsModalOpen={setIsModalOpen}/>
      </Modal>
      <div className='flex mx-32 gap-x-5'>
        <Sidebar setIsModalOpen={setIsModalOpen}/>
        <main className='mr-5 pt-8 flex-1 basis-2/4 border-x-2 border-stone-100 min-h-screen'>
            <PostsList/>
        </main>
        <Search/>
      </div>
    </>
  } 
  </>
  
  )
}

export default Home
