import React from 'react'
import dynamic from "next/dynamic";
const LoadingSpinner = dynamic(() => import("./LoadingSpinner"))

const withDataListHOC=(WrappedComponent,queryFn,mapFn)=>{
    
    return function withDataListHOC ({currUserId,errMsg}){      

        const {data,isLoading,error,isError} = queryFn(currUserId);

        let content;

        if(isLoading){
            content=<LoadingSpinner/>
        }

        else if(isError){
            let a=error
            content=<p color='red'>{a?.message}</p>
        }

        else if(data){
            console.log(data);

            if(data.length===0){
                console.log('aye',errMsg)
                content=<p className='text-center font-medium' color='black'>{errMsg}</p>;
            }

            else content=mapFn(data,currUserId);
        }

        return (
            <WrappedComponent content={content}/>
        )
    }
}


export default withDataListHOC