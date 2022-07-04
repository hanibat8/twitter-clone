import React from 'react'
import {motion,AnimatePresence} from 'framer-motion';

interface Props{
    isModalOpen:boolean,
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
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

const Modal:React.FC<Props>=({isModalOpen,setIsModalOpen,children})=>{

  /*const emailInputRef=useRef<any>(null);
  const passInputRef=useRef<any>(null);

  const onSubmitHandler=(e:React.FormEvent<HTMLFormElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.preventDefault();
      console.log('here',emailInputRef.current.value)
  
      if(emailInputRef.current.value===''|| passInputRef.current.value==='' || !((emailInputRef.current.value.includes('@') && emailInputRef.current.value.includes('.'))) || (passInputRef?.current?.value.length<6)){
        console.log(emailInputRef.current.value==='',passInputRef.current.value==='', (emailInputRef.current.value.includes('@')),  emailInputRef.current.value.includes('.') , (passInputRef?.current?.value.length<6))
        return;
      }
    
      console.log('reached here')
      setEmailCredentials({email:emailInputRef.current.value,password:passInputRef.current.value})
      setIsModalOpen(false)
  }*/

  return (
    <AnimatePresence exitBeforeEnter>
        {isModalOpen && (
            <motion.div
            className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 flex place-items-center' 
            variants={backdrop}
            initial="hidden"
            animate="visible"
            onClick={()=>setIsModalOpen(false)}
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