import type { NextPage } from 'next'
import { useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import {addCurrentUser} from '../components/currentUserSlice'
import SignUpLoginFullScreen from '../components/SignUpLoginFullScreen';
import LoadingScreen from '../components/LoadingScreen';
import MainSection from '../components/MainSection';
import PostsList from '../components/Posts/PostsList';


const Home: NextPage = () => {
  
  const {data:session,status}=useSession();
  //console.log(session)

  const currentUser=useSelector((state:RootState)=>state.currentUser);
  console.log(currentUser)

  const dispatch=useDispatch();

  useEffect(()=>{
    if(session?.user){
      console.log(session.user)
      dispatch(
        addCurrentUser({name:session.user.name,
                        email:session.user.email,
                        image:session.user.image,
                        userId:session?.user.userId}))
    }
     
  },[session?.user,dispatch,session?.user.userId])

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
            <PostsList currUserId={currentUser.userId} errMsg='No posts found'/>
        </MainSection>
     }

  </>
  )
}

export default Home
