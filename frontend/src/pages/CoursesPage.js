import React, { useState, useEffect } from "react";
import $ from 'jquery';

export const CoursesPage = ()=>{
    const [cdata, setcdata] = useState([])

    useEffect(()=>{
        const getInstructer= async()=>{
            const reqOptions ={
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            }
            const response = await fetch("http://127.0.0.1:8000/student/courses", reqOptions)
            const data = await response.json()
    
            if(!response.ok){
                console.log({"error":data.detail})
            }
            else{
                setcdata(data)
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
            <h3 style={{marginLeft:"280px",fontWeight:600}} className="">Courses</h3>
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
                            <th scope="col">coursename</th>
                            <th scope="col">subject</th>
                            <th scope="col">totalhours</th>
                            <th scope="col">available</th>
                            </tr>
                        </thead>
                        <tbody>
                                {cdata.map(e=>{
                                    return(
                                        <tr key={e.student_id}>
                                        <th scope="col">{e.courseid}</th>
                                        <td>{e.coursename}</td>
                                        <td>{e.subject}</td>
                                        <td>{e.totalhours}</td>
                                        <td>{JSON.stringify(e.available)}</td>
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