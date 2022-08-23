import {  collection, doc , query, 
        where, documentId } from 'firebase/firestore'
import { apiSlice, getDataFirebase,getFollowingArrFirebase,updateDataFirebase } from '../apiSlice'
import { db } from '../../firebase.config';

interface Users{
    image:string,
    name:string
  }

const extendedApi = apiSlice.injectEndpoints({
endpoints: (build) => ({

    getUsers: build.query<Users[],void>({
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
    
            return {data:'ok'} 
          }
    
          catch(err){
            return {error:err}
          }
    
        },invalidatesTags:['Posts','Users']
      }),
    }),
    overrideExisting:true
})

export const { useGetUsersQuery,useFollowUserMutation } = extendedApi