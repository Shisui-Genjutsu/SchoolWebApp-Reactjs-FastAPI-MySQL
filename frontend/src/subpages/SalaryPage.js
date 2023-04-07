import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import $ from "jquery";

export const TSalaryPage = ()=>{
    const [stdata, setstdata] = useState([])
    const [token] = useContext(UserContext)
    useEffect(()=>{
        const fetchUser = async()=>{
            const requestOptions = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + localStorage.getItem("teacherToken")
                }
            }
            const response = await fetch("http://127.0.0.1:8002/token/decoder", requestOptions)
            const data = await response.json()
            if(!response.ok){
                console.log({"error":data.detail})
            }
            else{
                console.log(data["teachsalary"])
                setstdata(data["teachsalary"])
            }
        }
        fetchUser();
    },[token])

    // search 
    $("#attsearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#atttable tr").filter(function() {
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
        <h3 style={{marginLeft:"280px",fontWeight:600}} className="">Attendance</h3>
        <div className="container mt-5">
        <div className="row">
                <div className="col-8 offset-2 mb-3">
                <form class="d-flex" role="search">
                    <input id="attsearch" class="form-control me-2 border border-dark" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                <table id="atttable" class="table table-dark table-hover shadow-lg">
                    <thead>
                            <tr>
                            <th scope="col">sno</th>
                            <th scope="col">total salary</th>
                            <th scope="col">PF</th>
                            <th scope="col">paid</th>
                            <th scope="col">id</th>
                            </tr>
                        </thead>
                        <tbody>
                                    
                                        {stdata.map(e=>{
                                            return(
                                                <tr key={e.salary_id}>
                                                <th scope="col">{e.salary_id}</th>
                                                <td>{e.total_salary}</td>
                                                <td>{e.PF}</td>
                                                <td>{JSON.stringify(e.paid)}</td>
                                                <td>{e.teacher_id}</td>
                                                </tr> 
                                            )
                                        })}
                                    
                            {/* <tr>
                            <th scope="col">sno</th>
                            <td scope="col">standard</td>
                            <td scope="col">section</td>
                            <td scope="col">date</td>
                            <td scope="col">present</td>
                            <td scope="col">date</td>
                            <td scope="col">id</td>
                            </tr> */}
                        </tbody>
                    </table> 
                </div>
            </div>
        </div> 
        </>
    )
}