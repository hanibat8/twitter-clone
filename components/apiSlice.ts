import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { doc ,getDocs, updateDoc, getDoc, DocumentReference } from 'firebase/firestore'
import { db } from '../firebase.config';

export const getFollowingArrFirebase=async (currUserId:any)=>{
  let currUserDocRef = doc(db,`users/${currUserId}`);
  let docData=(await getDoc(currUserDocRef)).data();
  let followingsArr=docData?.following??[];
  followingsArr.push(currUserId);
  return followingsArr
}

export const getDataFirebase=async (q:any)=>{
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc)=> ({id: doc.id, ...doc.data() as object}))
}

const addItemToArr=(arr,id,item)=>{
  if(arr.includes(id)) arr=arr.filter(itemId=>itemId!=id);
    else arr.push(item);
    return arr;
}

export const updateDataFirebase=async (docRef:DocumentReference,property:string,id:string|{id:string,reply:string})=>{
  let docData=(await getDoc(docRef)).data();
  let arr=docData?.[property]??[];

  console.log(id,arr,docData?.[property]);
  
  if (typeof id === 'string' || id instanceof String){
    arr=addItemToArr(arr,id,id)
  }
  else{
    //console.log(id)
    arr=addItemToArr(arr,id.id,id)
  }
    console.log(docRef,property,arr)
  await updateDoc(docRef,property,arr);
}

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath:'api/apiSlice',
  baseQuery: fakeBaseQuery(),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ['Posts','Post','Users','RetweetPosts'],
  endpoints: builder => ({
  })
})
