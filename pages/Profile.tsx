import React from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../components/LoadingScreen';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';
import PostsSection from '../components/Posts/PostsSection';

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
        <PostsSection/>
      }

  </>
  )
}
