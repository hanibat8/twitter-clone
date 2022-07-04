import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjq2zup0E9HKN_wFpgfoe59IGL9gc_Qos",
  authDomain: "twitter-clone-32e4c.firebaseapp.com",
  projectId: "twitter-clone-32e4c",
  storageBucket: "twitter-clone-32e4c.appspot.com",
  messagingSenderId: "497495816778",
  appId: "1:497495816778:web:5f9d46fca0cb3cde6a44b3"
};

const app = getApps.length >0 ? getApp(): initializeApp(firebaseConfig);

const db=getFirestore(app);

const storage=getStorage(app);

export {app ,db, storage}