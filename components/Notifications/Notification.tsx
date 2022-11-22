import React from 'react'

const Notification = ({id,children}) => {
  return (
    <article id={id} className="border-b-2 border-stone-100 flex items-start gap-x-2 p-4 hover:cursor-pointer" >   
        {children}
  </article>
  )
}

export default Notification