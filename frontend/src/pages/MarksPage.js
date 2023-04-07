import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import $ from "jquery";

export const MarksPage = ()=>{
    const [mdata, setmdata] = useState([])
    const [token] = useContext(UserContext)
    useEffect(()=>{
        const fetchUser = async()=>{
            const requestOptions = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + localStorage.getItem("studentToken")
                }
            }
            const response = await fetch("http://127.0.0.1:8000/token/decoder", requestOptions)
            const data = await response.json()
            if(!response.ok){
                console.log({"error":data.detail})
            }
            else{
                console.log(data["sturesults"])
                setmdata(data["sturesults"])
            }
        }
        fetchUser();
    },[token])

    // search 
    $("#markssearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#markstable tr").filter(function() {
            if (value){
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                }
                else{
                    return false
                }
        });
    });
    // search
    return(
        <>
        <h3 style={{marginLeft:"280px",fontWeight:600}} className="">Progress</h3>
        <div className="container mt-5">
        <div className="row">
                <div className="col-8 offset-2 mb-3">
                <form class="d-flex" role="search">
                    <input id="markssearch" class="form-control me-2 border border-dark " type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                <table id="markstable" class="table table-dark table-hover shadow-lg">
                    <thead>
                            <tr>
                            <th scope="col">results id</th>
                            <th scope="col">grade</th>
                            <th scope="col">marks</th>
                            <th scope="col">student id</th>
                            </tr>
                        </thead>
                        <tbody>
                                {mdata.map(e=>{
                                    return(
                                        <tr key={e.student_id}>
                                        <th scope="col">{e.results_id}</th>
                                        <td>{e.grade}</td>
                                        <td>{e.marks}</td>
                                        <td>{e.student_id}</td>
                                        </tr> 
                                    )
                                })}
                        </tbody>
                    </table> 
                </div>
            </div>
        </div> 
        </>
    )
}