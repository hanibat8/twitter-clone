import type { NextPage } from 'next'
import { useSession} from 'next-auth/react';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';
import LoadingScreen from '../components/LoadingScreen';
import PostsSection from '../components/Posts/PostsSection';

/*const getCurrentUserFollowingArray=async (userId:string|any)=>{
  let docRef = doc(db,`users/${userId}`);
  let res=await getDoc(docRef)
  console.log(res)
  console.log(res.get('following'));
  return res.get('following')
}*/

const Home: NextPage = () => {
  //const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
  
  const {data:session,status}=useSession();
  //console.count('Rerender');
  //console.log(session,status)

  //let following:string[];
  //getCurrentUserFollowingArray(session?.userId).then(data=>following=data);

  return (
  <>
    
    {!session && status==='unauthenticated' && 
     <SignUpLoginFullScreen/>
    }
    
    {!session && status==='loading' && 
      <LoadingScreen/>
    }
    
    {session && status==='authenticated' &&
        <PostsSection/>
     }

  </>
  )
}

export default Home
