import React, { useEffect, useState } from "react";
import $ from "jquery";

export const InstructersPage = ()=>{
    const [idata,setidata] = useState([])

    useEffect(()=>{
    const getInstructer= async()=>{
        const reqOptions ={
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        }
        const response = await fetch("http://127.0.0.1:8002/allinstructers", reqOptions)
        const data = await response.json()

        if(!response.ok){
            console.log({"error":data.detail})
        }
        else{
            setidata(data)
        }
    }
    getInstructer()
},[])

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
                            <th scope="col">Sno</th>
                            <th scope="col">firstname</th>
                            <th scope="col">lastname</th>
                            <th scope="col">email</th>
                            <th scope="col">department</th>
                            <th scope="col">sex</th>
                            </tr>
                        </thead>
                        <tbody>
                                {idata.map(e=>{
                                    return(
                                        <tr key={e.student_id}>
                                        <th scope="col">{e.id}</th>
                                        <td>{e.firstname}</td>
                                        <td>{e.lastname}</td>
                                        <td>{e.email}</td>
                                        <td>{e.department}</td>
                                        <td>{e.sex}</td>
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