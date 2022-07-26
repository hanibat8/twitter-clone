import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { addDoc, collection, onSnapshot, deleteDoc, doc ,query, where } from 'firebase/firestore'
import {db} from '../firebase.config';

interface Posts{
  id:string,
  timestamp:string,
  tweet:string,
  creatorId:string
}

interface Users{
  image:string,
  name:string
}

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath:'api/apiSlice',
  baseQuery: fakeBaseQuery(),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ['Posts','Users'],
  endpoints: builder => ({
    getPosts: builder.query<Posts[],void>({
      async queryFn(followingsArr):Promise<any>{
        try{
          //const tweetsRef=collection(db,'tweets');
         /* let tweetsArr: { }[]=[];
          onSnapshot(collection(db,'tweets'),(querySnapshot)=>{
           tweetsArr=querySnapshot.docs.map((doc)=>{
            console.log(doc.data());
               return {...doc.data()}
            })*/
            /*querySnapshot?.forEach((doc)=>{
              //console.log({...document.data()});
              let tweetObj=Object.assign({},doc.data());
              tweetsArr.push({
                ...tweetObj
              })
            })
          })*/
          let tweetsArr: { }[]=[];
          const q=query(collection(db,'tweets'), where("creatorId", "in" , followingsArr))
          return new Promise((resolve, reject) => {
            onSnapshot(q,(querySnapshot)=>{
              tweetsArr=querySnapshot.docs.map((doc)=>{
               //console.log(doc.data());
                  return {id:doc.id,
                    ...doc.data()}
               })
               //console.log(tweetsArr);
               resolve({data:tweetsArr});
            })})  
        
        //console.log(tweetsArr);
        //return {data:tweetsArr} 
        }
        catch(err:any){
          return{error:err} 
        }
    },providesTags: ['Posts']}),
    
    addPost:builder.mutation({
        async queryFn(data):Promise<any>{
          try{
            await addDoc(collection(db,'tweets'),{
                timestamp: new Date().toISOString(),
                ...data
            })
            return {data:'ok'} 
          }
          catch(err){
            return {error:err}
          }
        },invalidatesTags:['Posts']
    }),
    
    deletePost:builder.mutation({
      async queryFn(id):Promise<any>{
        try{
          //console.log(id);
          await deleteDoc(doc(db,`tweets/${id}`))
          return {data:'ok'} 
        }
        catch(err){
          return {error:err}
        }
      },invalidatesTags:['Posts']
  }),

  getUsers: builder.query<Users[],void>({
    async queryFn():Promise<any>{
      try{
        let usersArr: { }[]=[];
        return new Promise((resolve, reject) => {
          onSnapshot(collection(db,'users'),(querySnapshot)=>{
            console.log(querySnapshot.docs)
            usersArr=querySnapshot.docs.map((doc)=>{
             console.log(doc.data());
                return {id:doc.id,
                  ...doc.data()}
             })
             console.log(usersArr);
             resolve({data:usersArr});
          })})  
      
      //console.log(tweetsArr);
      //return {data:tweetsArr} 
      }
      catch(err:any){
        return{error:err} 
      }
  },providesTags: ['Users'],}),

  followUser:builder.mutation({
    async queryFn(id):Promise<any>{
      try{
        //console.log(id);
        await deleteDoc(doc(db,`tweets/${id}`))
        return {data:'ok'} 
      }
      catch(err){
        return {error:err}
      }
    },invalidatesTags:['Posts']
  })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useGetUsersQuery } = apiSlice