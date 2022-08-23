import { addDoc, collection, deleteDoc, doc , query,  where } from 'firebase/firestore'
import { apiSlice, getDataFirebase,getFollowingArrFirebase,updateDataFirebase } from '../apiSlice'
import { db } from '../../firebase.config';

interface Posts{
  id:string,
  timestamp:string,
  tweet:string,
  creatorId:string,
  likedBy:string[]
}

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
     
    getPosts: build.query<Posts[],void>({
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
    
    addPost:build.mutation({
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

        },invalidatesTags:['Posts'],
        async onQueryStarted(data, { dispatch, queryFulfilled }) {
          // `updateQueryData` requires the endpoint name and cache key arguments,
          // so it knows which piece of cache state to update
          console.log(data)
          const patchResult = dispatch(
            apiSlice.util.updateQueryData<string>('getPosts', undefined, (draft:Posts[]) => {
              console.log(data,draft)
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              draft.unshift({
                timestamp: new Date().toISOString(),
                ...data
            })
            })
          )
          console.log(data,patchResult)
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        }
    }),
    
    deletePost:build.mutation({
      async queryFn(id)/*:Promise<any>*/{
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

  getRetweetedPosts: build.query<Posts[],void>({
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
  likeTweet:build.mutation({
    async queryFn({id,currUserId}):Promise<any>{
      try{
        let likedDocRef = doc(db,`tweets/${id}`);
        updateDataFirebase(likedDocRef,'likedBy',currUserId)
        
        return {data:'ok'} 
      }
      catch(err){
        return {error:err}
      }
    },
    async onQueryStarted({id,currUserId}, { dispatch, queryFulfilled }) {
      // `updateQueryData` requires the endpoint name and cache key arguments,
      // so it knows which piece of cache state to update
      const patchResult = dispatch(
        apiSlice.util.updateQueryData<string>('getPosts', undefined, (draft:Posts[]) => {
          console.log(draft)
          // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
          const post = draft.find(post => post.id === id)
            if (post) {
              post?.likedBy.push(currUserId)
            }
          console.log(post)
        })
      )
      console.log(patchResult)
      try {
        await queryFulfilled
      } catch {
        patchResult.undo()
      }
    }
  }),

  retweetTweet:build.mutation({
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
  }),
  overrideExisting:true
})

export const { useGetPostsQuery,
              useAddPostMutation,
              useDeletePostMutation,
              useGetRetweetedPostsQuery,
              useLikeTweetMutation,
              useRetweetTweetMutation } = extendedApi