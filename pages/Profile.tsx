import React, { useState } from 'react';
import dynamic from "next/dynamic";
import { useSession } from 'next-auth/react';
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';
import PostRetweetPostsList from '../components/Posts/PostRetweetPostsList';
import PostLikesList from '../components/Posts/PostLikesList';

const LoadingScreen = dynamic(() => import("../components/LoadingScreen"))
const MainSection = dynamic(() => import("../components/MainSection"))

export default function Profile() {
  const {data:session,status}=useSession();
  const [tabClicked,setTabClicked]=useState('Tweets');

  const classActiveTab="text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500 inline-block p-4 border-b-2";
  const classInactiveTab="border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 inline-block p-4 border-b-2";

  const onTweetsTabClickHandler=(e)=>{
    e.preventDefault();
    setTabClicked('Tweets')
  }

  const onLikesTabClickHandler=(e)=>{
    e.preventDefault();
    setTabClicked('Likes');
  }
  
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
              <div className='px-4'>
                  <img className='rounded-full' src={session?.user?.image!}/>
                  <h2 className='text-xl font-bold mt-2'>{session.user.name}</h2>
                  <h3 className=' text-slate-500'>{'@__'+session.user.name}</h3>
                  <div className='flex'>
                    <h3>{}Following</h3>
                    <h3>Followers</h3>
                  </div>
              </div>
              <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-base">
                    <li className="mr-2 flex-1 cursor-pointer hover:bg-slate-200" onClick={onTweetsTabClickHandler}>
                        <span className={tabClicked==='Tweets'? classActiveTab : classInactiveTab} aria-current="page">Tweets</span>
                    </li>
                    <li className="mr-2 flex-1 cursor-pointer hover:bg-slate-200" onClick={onLikesTabClickHandler}>
                        <span className={tabClicked==='Likes'? classActiveTab : classInactiveTab}>Likes</span>
                    </li>
                </ul>
            </div>
            {tabClicked==='Tweets' ? <PostRetweetPostsList currUserId={session?.userId} errMsg='No retweeted posts'/>
                                   : <PostLikesList currUserId={session?.userId} errMsg='No liked posts'/>}
          </main>
        </MainSection>  
      }

  </>
  )
}
