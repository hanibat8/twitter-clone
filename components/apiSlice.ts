import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { addDoc, collection, deleteDoc, doc ,getDocs, query, 
        where, updateDoc, getDoc, documentId, DocumentReference } from 'firebase/firestore'
import { db } from '../firebase.config';

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

const getFollowingArrFirebase=async (currUserId:any)=>{
  let currUserDocRef = doc(db,`users/${currUserId}`);
  let docData=(await getDoc(currUserDocRef)).data();
  let followingsArr=docData?.following??[];
  followingsArr.push(currUserId);
  return followingsArr
}

const getDataFirebase=async (q:any)=>{
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc)=> ({id: doc.id, ...doc.data() as object}))
}

const updateDataFirebase=async (docRef:DocumentReference,property:string,id:string)=>{
  let docData=(await getDoc(docRef)).data();
  let arr=docData?.[property]??[];
  //console.log(arr,docData?.[property]);
  if(arr.includes(id)) return {data:'ok'}
  arr.push(id);
  await updateDoc(docRef,property,arr);
}

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath:'api/apiSlice',
  baseQuery: fakeBaseQuery(),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ['Posts','Users','RetweetPosts'],
  endpoints: builder => ({
    
    getPosts: builder.query<Posts[],void>({
      async queryFn(currUserId):Promise<any>{
        try{
          let followingsArr=await getFollowingArrFirebase(currUserId);
          let tweetsArr: { }[]=[];
          const q=query(collection(db,'tweets'), where("creatorId", "in" , followingsArr))   
          tweetsArr=await getDataFirebase(q)
          //console.log(tweetsArr)
          return { data:tweetsArr }
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

  getRetweetedPosts: builder.query<Posts[],void>({
    async queryFn(currUserId):Promise<any>{
      try{
        let tweetsArr: { }[]=[];
        const q=query(collection(db,'tweets'), where("retweetedBy", "array-contains" , currUserId))
        tweetsArr = await getDataFirebase(q)
        return ({data:tweetsArr})
      }

      catch(err:any){
        return{error:err} 
      }

  },providesTags: ['RetweetPosts']}),

  getUsers: builder.query<Users[],void>({
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

  followUser:builder.mutation({
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

  likeTweet:builder.mutation({
    async queryFn({id,currUserId}):Promise<any>{
      try{
        let likedDocRef = doc(db,`tweets/${id}`);
        updateDataFirebase(likedDocRef,'likedBy',currUserId)
        
        return {data:'ok'} 
      }
      catch(err){
        return {error:err}
      }
    }
  }),

  retweetTweet:builder.mutation({
    async queryFn({id,currUserId}):Promise<any>{
      try{
        let retweetedDocRef = doc(db,`tweets/${id}`);
        updateDataFirebase(retweetedDocRef,'retweetedBy',currUserId)
        
        return {data:'ok'} 
      }
      catch(err){
        return {error:err}
      }
    },invalidatesTags:['RetweetPosts']
  })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, 
              useAddPostMutation, 
              useDeletePostMutation,
              useGetRetweetedPostsQuery,
              useLikeTweetMutation, 
              useRetweetTweetMutation, 
              useGetUsersQuery, 
              useFollowUserMutation } = apiSlice