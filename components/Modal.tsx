import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from './modalSlice';
import { RootState } from '../app/store';
import {motion,AnimatePresence} from 'framer-motion';

interface Props{
    children:React.ReactNode
}

const backdrop={
  visible:{opacity:1},
  hidden:{opacity:0}
}

const modal={
  hidden:{
    opacity:0
  },
  visible:{
    opacity:1,
    transition:{delay:0.25}
  }
}

const Modal:React.FC<Props>=({children})=>{

  const IsModalOpen=useSelector((state:RootState)=>state.isModalOpen);
  const dispatch=useDispatch();

  const onClickHandler=()=>{
    dispatch(toggleModal(false))
  }

  return (
    <AnimatePresence exitBeforeEnter>
        {IsModalOpen && (
            <motion.div
            className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 flex place-items-center' 
            variants={backdrop}
            initial="hidden"
            animate="visible"
            onClick={onClickHandler}
            >
                <motion.div
                variants={modal}
                className='w-1/3 my-10 mx-auto py-10 px-5 rounded-lg bg-white border-2 border-slate-600 text-white p-2'
                onClick={(e)=>e.stopPropagation()}
                >
                  {children}
                </motion.div>
            </motion.div>
        )
        }
    </AnimatePresence>
  )
}

export default Modal;