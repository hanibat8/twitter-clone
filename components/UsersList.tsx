import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import { useGetUsersQuery } from '../services/apiSlice'
import Users from './Users';

interface PropsType{
  currentUserId:string|any
}

const UsersList:React.FC<PropsType>=({currentUserId})=> {

  const {data:users,isLoading,error,isError}=useGetUsersQuery();
  //console.log(users);

  let content;

  //do check this later
  //content=React.useMemo(()=>mapPosts(posts), [posts]);

  if(isLoading){
    content=<LoadingSpinner/>
  }

  else if(isError){
      let a:any=error
      content=<p color='red'>{a?.message}</p>
  }

  else if(users){
    if(users.length<=0){
      //console.log('aye')
      content=<p color='black'>No users</p>;
      return null;
    }

    //console.log(users);
    content=users.filter((user:any)=>user.id!==currentUserId).map((user:any) => (
        <Users key={user.id} {...user}/>
      ))
  }

  return (
    <section className='mt-8 py-6 rounded-2xl bg-gray-100'>
      {content}
    </section>
  )
}

export default UsersList;
