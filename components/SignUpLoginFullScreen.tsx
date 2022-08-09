import React from 'react'
import Modal from '../components/Modal';
import SignUpLoginScreen from '../components/SignUpLoginScreen';
import SignInForm from '../components/SignInForm';

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