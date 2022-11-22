import React from 'react'
import type { NextPage } from 'next'
import MainSection from '../components/MainSection'
import NotificationsList from '../components/Notifications/NotificationsList'

import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

const Notifications:NextPage = () => {
  const currentUser=useSelector((state:RootState)=>state.currentUser);
  return (
    <MainSection>
          <NotificationsList currUserId={currentUser.userId}  errMsg='No notifications found'/>
    </MainSection>  
  )
}

export default Notifications