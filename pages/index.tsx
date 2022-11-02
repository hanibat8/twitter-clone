import type { NextPage } from 'next'
import { useSession} from 'next-auth/react';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';
import LoadingScreen from '../components/LoadingScreen';
import MainSection from '../components/MainSection';
import PostsList from '../components/Posts/PostsList';

const Home: NextPage = () => {
  
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
        <MainSection>
            <PostsList currUserId={session?.userId} errMsg='No posts found'/>
        </MainSection>
     }

  </>
  )
}

export default Home
