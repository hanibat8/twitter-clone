import React from 'react'
import withDataListHOC from '../withDataListHOC'
import Notification from './Notification'
import { useGetNotificationsQuery } from './notificationsSlice'

import dynamic from "next/dynamic";
const LinkCustom = dynamic(() => import("../LinkCustom"))

const mapNotifications=(notifications,currUserId:string)=>{
    return notifications?.map((notification:any) => (
        <LinkCustom key={notification.id} href={`post/${notification.postId}`}>
            <Notification id={notification.id}>
              <p>{notification.message}</p>
            </Notification>
        </LinkCustom>
        
      ))
}

const NotificationsList = ({content}) => {

    return (
        <section className="posts-list">
            {content}
        </section>
    )
}

export default withDataListHOC(NotificationsList,useGetNotificationsQuery,mapNotifications)