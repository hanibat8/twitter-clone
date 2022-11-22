import {  collection, doc , query, 
    where, documentId, addDoc } from 'firebase/firestore'
import { apiSlice, getDataFirebase,getFollowingArrFirebase,updateDataFirebase } from '../apiSlice'
import { db } from '../../firebase.config';

interface Notifications{
    message:string,
    creatorId:string,
    id:string
}

const extendedApi = apiSlice.injectEndpoints({
endpoints: (build) => ({

    getNotifications: build.query<Notifications[],string>({
        async queryFn(currUserId):Promise<any>{
            if(currUserId!=null){
                try{
                    const q=query(collection(db,'notifications'), where( "postCreatorId", "==" , currUserId))
                    let notificationsArr= await getDataFirebase(q);
                    console.log(notificationsArr)
                    return {data:notificationsArr}   
                    }
  
                catch(err:any){
                return{error:err} 
                }
            }

            else{
                return {data:'ok'}
            }

  }}),

    addNotification:build.mutation({
        async queryFn(data):Promise<any>{
            try{
                console.log(data)
                const q=query(collection(db,'notifications'), where( "postCreatorId", "==" ,data.postCreatorId ),where("message","==",data.message))
               if(!q){      
                await addDoc(collection(db,'notifications'),{
                    timestamp: new Date().toISOString(),
                ...data
            })
               } 
                
                return {data:'ok'} 
            }

            catch(err){
                return {error:err}
            }

    },
}),
 
}),
overrideExisting:true
})

export const {useGetNotificationsQuery, useAddNotificationMutation } = extendedApi