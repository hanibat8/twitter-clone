import {  collection, doc , query, 
        where, documentId } from 'firebase/firestore'
import { apiSlice, getDataFirebase,getFollowingArrFirebase,updateDataFirebase } from '../apiSlice'
import { db } from '../../firebase.config';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { QueryKeys } from '@reduxjs/toolkit/dist/query/core/apiState';

interface Users{
    image:string,
    name:string,
    id:string
}

const extendedApi = apiSlice.injectEndpoints({
endpoints: (build) => ({

    getUsers: build.query<Users[],void>({
        async queryFn(currUserId):Promise<any>{
          if(currUserId!==null || undefined){
            try{
              console.log(currUserId)
              let followingsArr=await getFollowingArrFirebase(currUserId);
              console.log(followingsArr)
              let usersArr: { }[]=[];
              const q=query(collection(db,'users'), where( documentId(), "not-in" , followingsArr))
              usersArr= await getDataFirebase(q);
              console.log(usersArr)
              return {data:usersArr}   
            } 
      
            catch(err:any){
              console.log(err)
              return{error:err} 
            }
          }

          else{
            return {data:'ok'}
          }
    
      },providesTags: ['Users']}),

      getFollowingFollowersUsersList: build.query<Users[],void>({
        async queryFn(currUserId):Promise<any>{
          try{
            let followingsArr=await getFollowingArrFirebase(currUserId);
            let usersArr: { }[]=[];
            const q=query(collection(db,'users'), where( documentId(), "not-in" , followingsArr))
            usersArr= await getDataFirebase(q);
            console.log(usersArr)
            return {data:usersArr}   
          }
    
          catch(err:any){
            return{error:err} 
          }
    
      },providesTags: ['Users']}),
    
      followUser:build.mutation({
        async queryFn({id,currUserId}):Promise<any>{
          try{
            let currUserDocRef = doc(db,`users/${currUserId}`);
            await updateDataFirebase(currUserDocRef,'following',id)
            let followedDocRef = doc(db,`users/${id}`);
            await updateDataFirebase(followedDocRef,'following',currUserId)
            return {data:'ok'} 
          }
    
          catch(err){
            return {error:err}
          }
    
        },invalidatesTags:['Posts','Users'],
        async onQueryStarted({id,currUserId}, { dispatch, queryFulfilled }) {
          // `updateQueryData` requires the endpoint name and cache key arguments,
          // so it knows which piece of cache state to update
          const patchResult = dispatch(
            extendedApi.util.updateQueryData<QueryKeys<{getUsers: QueryDefinition<void, BaseQueryFn<any, unknown, unknown, {}, {}>, "Posts" | "Post" | "Users" | "RetweetPosts", Users[], "api/apiSlice">}>>('getUsers', currUserId, (draft:Users[]) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const indexOfObject = draft.findIndex(object =>object.id === id);
              
              draft.splice(indexOfObject, 1);
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        }
      }),
      
    }),
    overrideExisting:true
})

export const { useGetUsersQuery,useFollowUserMutation } = extendedApi