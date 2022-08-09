import React from 'react';
import dynamic from "next/dynamic";
import { useSession } from 'next-auth/react';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';

const LoadingScreen = dynamic(() => import("../components/LoadingScreen"))
const PostsSection = dynamic(() => import("../components/Posts/PostsSection"))

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
