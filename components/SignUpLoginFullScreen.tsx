import React from 'react'
import Modal from '../components/Modal';
import SignUpLoginScreen from '../components/SignUpLoginScreen';
import dynamic from "next/dynamic";
const SignInForm = dynamic(() => import("./SignInForm"))

const SignUpLoginFullScreen=()=>{
  return (
    <>
        <Modal>
            <SignInForm />
        </Modal>
        <SignUpLoginScreen/>
    </>
  )
}

export default SignUpLoginFullScreen