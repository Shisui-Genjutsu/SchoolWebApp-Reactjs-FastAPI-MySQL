import React, { createContext, useState, useEffect } from 'react';

export const  UserContext = createContext()

export const UserProvider = (props)=>{
    const[token, settoken] = useState(localStorage.getItem("studentToken"));
    //student
    useEffect(()=>{ 
        const fetchUser = async()=>{
            const requestOptions = {
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
            const response = await fetch("http://127.0.0.1:8000/", requestOptions)

            if(!response.ok)
            {
                settoken(null)
            }
            localStorage.setItem("studentToken", token);
        }
        fetchUser();
    },[token])
    //teacher
    // useEffect(()=>{
    //     const fetchtUser = async()=>{
    //         const requestOptions = {
    //             method:"GET",
    //             headers:{
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + ttoken,
    //             },
    //         }
    //         const response = await fetch("http://127.0.0.1:8002/", requestOptions)

    //         if(!response.ok)
    //         {
    //             console.log(ttoken)
    //             setttoken(null)
    //         }
    //         localStorage.setItem("teacherToken", ttoken);
    //     }
    //     fetchtUser();
    // },[ttoken])
    // //admin
    // useEffect(()=>{
    //     const fetchadUser = async()=>{
    //         const requestOptions = {
    //             method:"GET",
    //             headers:{
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + adtoken,
    //             },
    //         }
    //         const response = await fetch("http://127.0.0.1:8002/", requestOptions)

    //         if(!response.ok)
    //         {
    //             setadtoken(null)
    //         }
    //         // localStorage.setItem("adminToken", adtoken);
    //     }
    //     fetchadUser();
    // },[adtoken])
    return(
        <UserContext.Provider value={[token,settoken]}>
            {props.children}
        </UserContext.Provider>
    )
}
