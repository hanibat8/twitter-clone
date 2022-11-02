import React from 'react'

const getMonthName=(monthNum)=>{
    switch(monthNum){
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'

    }
}

const PostTimestamp = ({timestamp}) => {

    let dateTimestamp=new Date(timestamp)
    let date=dateTimestamp.getDate();
    let month=getMonthName( dateTimestamp.getMonth());
    let year=dateTimestamp.getFullYear();
    
    return (
        <p className=' mt-6 mb-2 text-sm text-gray-500'>{month} {date}, {year}</p>
    )
}

export default PostTimestamp