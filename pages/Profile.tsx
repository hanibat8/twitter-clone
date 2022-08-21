import React from 'react';
import dynamic from "next/dynamic";
import { useSession } from 'next-auth/react';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';
import PostRetweetPostsList from '../components/Posts/PostRetweetPostsList';

const LoadingScreen = dynamic(() => import("../components/LoadingScreen"))
const MainSection = dynamic(() => import("../components/MainSection"))

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
        <MainSection>
          <main className='mr-5 pt-8 flex-1 basis-[45%] border-x-2 border-stone-100 min-h-screen'>
            <div className='h-20 '>
              <div className=''>
                  <img src={session?.user?.image!}/>
              </div>
            </div>
            <PostRetweetPostsList currUserId={session?.userId} errMsg='No retweeted posts'/>
          </main>
        </MainSection>  
      }

  </>
  )
}
