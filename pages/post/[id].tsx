import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { useSession} from 'next-auth/react';
import {useGetPostQuery} from '../../components/Posts/postsSlice';

import Post from '../../components/Posts/Post';
import PostActions from '../../components/Posts/PostActions';
import PostTimestamp from '../../components/Posts/PostTimsstamp';
import LoadingSpinner from '../../components/LoadingSpinner';
import MainSection from '../../components/MainSection';
import PostStats from '../../components/Posts/PostStats';
import PostReplyForm from '../../components/Posts/PostReplyForm';
import PostRepliesList from '../../components/Posts/PostRepliesList';

const SinglePost=()=>{

    const {data:session,}=useSession();

    const router = useRouter()
    const [pId,setPId]=useState<any>('');
    const [skip,setSkip]=useState(true)

    const {data:post,isLoading,error,isError} = useGetPostQuery(pId,{
        skip
    });

    useEffect(()=>{
        if(!router.isReady) return;
    
        setPId(router?.query?.id)
        setSkip(false)
        // codes using router.query
    
    }, [router.isReady]);

    let content;

    if(isLoading){
        content=<LoadingSpinner/>
    }

    else if(isError){
        let a:{message?:string}=error
        content=<p color='red'>{a?.message}</p>
    }

    else if(post && !(Object.keys(post).length === 0 && post.constructor === Object) && pId){
        console.log(post)
        content=<MainSection>
                  <Post 
                    id={post.id}
                    name={post.name}
                    image={post.image}>
                        <p className=' text-xl'>{post.tweet}</p>
                        <PostTimestamp timestamp={post.timestamp}/>
                        <PostStats likedBy={post.likedBy} 
                                retweetedBy={post.retweetedBy}/>
                        <PostActions id={post.id} 
                            creatorId={post.creatorId} currUserId={session?.userId}
                            likedBy={post.likedBy} retweetedBy={post.retweetedBy} />
                    </Post>
                    <PostReplyForm image={post.image} name={post.name} id={post.id} creatorId={post.creatorId}/>
                    <PostRepliesList replies={post?.replies}/>
            </MainSection>
    }

    console.log(post)

    return(
       <>
        {content}
       </>
    )
}

export default SinglePost