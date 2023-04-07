import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import $ from "jquery";

export const FeePage = ()=>{
    const [fdata, setfdata] = useState([])
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
                console.log(data["stufees"])
                setfdata(data["stufees"])
            }
        }
        fetchUser();
    },[token])

    // search 
    $("#feesearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#feetable tr").filter(function() {
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
        <h3 style={{marginLeft:"280px",fontWeight:600}} className="">Finance</h3>
        <div className="container mt-5">
        <div className="row">
                <div className="col-8 offset-2 mb-3">
                <form class="d-flex" role="search">
                    <input id="feesearch" class="form-control me-2 border border-dark " type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                <table id="feetable" class="table table-dark table-hover shadow-lg">
                    <thead>
                            <tr>
                            <th scope="col">fee id</th>
                            <th scope="col">total fee</th>
                            <th scope="col">fee due</th>
                            <th scope="col">paid</th>
                            <th scope="col">student id</th>
                            </tr>
                        </thead>
                        <tbody>
                                    
                                        {fdata.map(e=>{
                                            return(
                                                <tr key={e.student_id}>
                                                <td>{e.fee_id}</td>
                                                <td>{e.total_fee}</td>
                                                <td>{e.fee_due}</td>
                                                <td>{JSON.stringify(e.paid)}</td>
                                                <td>{e.student_id}</td>
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