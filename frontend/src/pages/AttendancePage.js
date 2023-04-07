import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import $ from "jquery";

export const AttendancePage = ()=>{
    const [adata, setadata] = useState([])
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
                console.log(data["stuattendence"])
                setadata(data["stuattendence"])
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
    // document.getElementById("attsearch").on("keyup", function() {
    //     let value = this.value.toLowerCase();
    //     document.querySelectorAll("#atttable tr").filter(function() {
    //         this.toggle(this.innerText.toLowerCase().indexOf(value) > -1)
    //     });
    // });
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
                            <th scope="col">standard</th>
                            <th scope="col">section</th>
                            <th scope="col">date</th>
                            <th scope="col">present</th>
                            <th scope="col">id</th>
                            </tr>
                        </thead>
                        <tbody>
                                    
                                        {adata.map(e=>{
                                            return(
                                                <tr key={e.id}>
                                                <th scope="col">{e.regno}</th>
                                                <td>{e.standard}</td>
                                                <td>{e.section}</td>
                                                <td>{e.ondate}</td>
                                                <td>{JSON.stringify(e.present)}</td>
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