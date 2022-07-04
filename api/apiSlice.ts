import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { addDoc, collection, serverTimestamp,getDocs } from 'firebase/firestore'
import {db} from '../firebase.config';

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath:'api/apiSlice',
  baseQuery: fakeBaseQuery(),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    getPosts: builder.query<any,void>({
      async queryFn():Promise<any>{
        try{
          const tweetsRef=collection(db,'tweets');
          let tweets: { id: string; }[]=[];
          const querySnapshot=await getDocs(tweetsRef);
          querySnapshot?.forEach((doc)=>{
            tweets.push({
              id:doc.id,
              ...doc.data()
            })
          })
          return {data:tweets}
        }
        catch(err){
          return{error:err}
        }
      }
    }),
    addPost:builder.mutation({
        async queryFn(data):Promise<any>{
          try{
            await addDoc(collection(db,'tweets'),{
                ...data
            })
          }
          catch(err){
            return {error:err}
          }
        }
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useAddPostMutation } = apiSlice