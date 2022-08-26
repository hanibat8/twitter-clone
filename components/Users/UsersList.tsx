import React from 'react'
import { useGetUsersQuery } from './usersSlice'

import withDataListHOC from '../withDataListHOC'
import Users from './Users';

interface PropsType{
  currentUserId:string|any,
  content:any
}

const mapUsers=(users:any,currUserId:string)=>{
  return users?.filter((user:any) =>user.id!==currUserId).map((user:any) => (
    <Users key={user.id} {...user}/>
  ))
};

const UsersList:React.FC<PropsType>=({content})=> {

  return (
    <section className='mt-8 py-6 rounded-2xl bg-gray-100'>
      {content}
    </section>
  )
}

export default withDataListHOC(UsersList,useGetUsersQuery,mapUsers);
