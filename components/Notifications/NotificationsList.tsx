import React from 'react'
import withDataListHOC from '../withDataListHOC'
import Notification from './Notification'
import { useGetNotificationsQuery } from './notificationsSlice'

const mapNotifications=(notifications,currUserId:string)=>{
    return notifications?.map((notification:any) => (
        <Notification key={notification.id} id={notification.id}>
              <p>{notification.message}</p>
        </Notification>
        
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