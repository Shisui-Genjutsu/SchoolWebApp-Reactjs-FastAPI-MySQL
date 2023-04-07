import React from 'react';

export const ErrorMsg = ({message})=>{
    return(
        <>
            <p className='text-danger mt-1'>{message}</p>
        </>
    )
}