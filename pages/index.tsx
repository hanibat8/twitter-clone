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
          <main className='mr-5 pt-8 flex-1 basis-[45%] border-x-2 border-stone-100 min-h-screen'>
            <PostsList currUserId={session?.userId} errMsg='No posts found'/>
          </main>
        </MainSection>
     }

  </>
  )
}

export default Home
