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

export const updateDataFirebase=async (docRef:DocumentReference,property:string,id:string)=>{
  let docData=(await getDoc(docRef)).data();
  let arr=docData?.[property]??[];
  //console.log(arr,docData?.[property]);
  if(arr.includes(id)) arr=arr.filter(itemId=>itemId!=id);
  else arr.push(id);
  await updateDoc(docRef,property,arr);
}

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath:'api/apiSlice',
  baseQuery: fakeBaseQuery(),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ['Posts','Users','RetweetPosts'],
  endpoints: builder => ({
  })
})
