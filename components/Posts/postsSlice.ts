import { addDoc, collection, deleteDoc, doc , query,  where } from 'firebase/firestore'
import { apiSlice, getDataFirebase,getFollowingArrFirebase,updateDataFirebase } from '../apiSlice'
import { db } from '../../firebase.config';

interface Posts{
  id:string,
  timestamp:string,
  tweet:string,
  creatorId:string,
  likedBy:string[],
  retweetedBy:string[]
}

const optimisticUpdateForLikeRetweet=(draft,currUserId,postId,property)=>{
  const post = draft.find(post => post.id === postId)
  if (post && !post?.[property]?.includes(currUserId)) {
    post[property]=post?.[property]??[];
    post?.[property].push(currUserId)
  }
  else if(post && post?.[property]?.includes(currUserId))
      post[property]=post?.[property].filter((tweetId)=>tweetId!==currUserId)
  console.log(post,draft,property,post[property])
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

    },providesTags: ['Posts'],
  }),
    
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

        },
        async onQueryStarted(data, { dispatch, queryFulfilled }) {
          // `updateQueryData` requires the endpoint name and cache key arguments,
          // so it knows which piece of cache state to update
          const patchResult = dispatch(
            apiSlice.util.updateQueryData<string>('getPosts', data.creatorId, (draft:Posts[]) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              draft.unshift({
                timestamp: new Date().toISOString(),
                ...data
            })

            console.log(draft)
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        }
    }),
    
    deletePost:build.mutation({
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
      const patchResult = dispatch(
        apiSlice.util.updateQueryData<string>('getPosts', currUserId, (draft:Posts[]) => {
            optimisticUpdateForLikeRetweet(draft,currUserId,id,'likedBy');
            
        })
      )
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
    },
    async onQueryStarted({id,currUserId}, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        apiSlice.util.updateQueryData<string>('getPosts', currUserId, (draft:Posts[]) => {
          optimisticUpdateForLikeRetweet(draft,currUserId,id,'retweetedBy');
            
        })
      )
      try {
        await queryFulfilled
      } catch {
        patchResult.undo()
      }
    }
  })
  }),
  overrideExisting:true
})

export const { useGetPostsQuery,
              useAddPostMutation,
              useDeletePostMutation,
              useLikeTweetMutation,
              useRetweetTweetMutation } = extendedApi