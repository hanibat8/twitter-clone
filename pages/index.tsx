import type { NextPage } from 'next'
import { FiTwitter } from "react-icons/fi";
import { useSession} from 'next-auth/react';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import PostsList from '../components/Posts/PostsList';
import SignInForm from '../components/SignInForm';
import AddPostForm from '../components/Posts/AddPostForm';
import Modal from '../components/Modal';
import SignUpLoginScreen from '../components/SignUpLoginScreen';
import UsersList from '../components/UsersList';
import { doc, getDoc } from 'firebase/firestore'
import {db} from '../firebase.config';

const getCurrentUserFollowingArray=async (userId:string|any)=>{
  let docRef = doc(db,`users/${userId}`);
  let res=await getDoc(docRef)
  return res.get('following');
}

const Home: NextPage = () => {
  //const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
  
  const {data:session,status}=useSession();
  //console.count('Rerender');
  //console.log(session,status)

  let followingArr:string[]|any=[];
  getCurrentUserFollowingArray(session?.userId).then(data=>followingArr=data);

  return (
  <>
    
    {!session && status==='unauthenticated' && 
      <>      
      <Modal>
        <SignInForm />
      </Modal>
      <SignUpLoginScreen/>
      </>
    }
    
    {!session && status==='loading' && 
      <div className='flex h-screen justify-center flex-col place-items-center'>
        <FiTwitter color='rgb(59 130 246)' size={50} className='fill-blue-500 '/>
        <span className='font-medium '>Loading...</span>
      </div>
    }
    
    {session && status==='authenticated' &&
      <>
        <Modal>
          <AddPostForm />
        </Modal>
        <div className='flex mx-32 gap-x-5'>
          <Sidebar/>
          <main className='mr-5 pt-8 flex-1 basis-[45%] border-x-2 border-stone-100 min-h-screen'>
            <PostsList followingArr={[session?.userId,...followingArr]}/>
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

export default Home
