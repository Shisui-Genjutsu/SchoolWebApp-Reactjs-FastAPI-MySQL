import React, {useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
import $ from "jquery";
// import { ModelComp } from "../components/ModelsComponent";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import "../index.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };

export const TLeavePage = ()=>{
    const [itldata, setitldata] = useState([])
    const [ttoken,settoken] = useState(localStorage.getItem("teacherToken"))
    const [tleaveid, settleaveid] = useState("")
    const [treason,settreason] = useState("")
    const [tnoofdays,settnoofdays] = useState("")
    const [teacherid,setteacherid]= useState(0)
    // const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
     const handletlOpen = () => setOpen(true);
    const handletlClose = () => setOpen(false);

    useEffect(()=>{
        const fetchtlUser = async()=>{
            const requestOptions = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + ttoken
                }
            }
            const response = await fetch("http://127.0.0.1:8002/token/decoder", requestOptions)
            const data = await response.json()
            if(!response.ok){
                console.log({"error":data.detail})
            }
            else{
                console.log(data["teachleaves"])
                setitldata(data["teachleaves"])
            }
        }
        fetchtlUser();
    },[ttoken])

    const modeltlSubmit = async()=>{
            const requestOptions = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                        "leave_id": tleaveid,
                        "reason": treason,
                        "no_of_days": tnoofdays,
                        "teacher_id": teacherid
                      })
            }
            const response = await fetch("http://127.0.0.1:8002/teacher/leaves", requestOptions)
            const data = await response.json()
            if(!response.ok){
                console.log({"error":data.detail})
            }
            else{
                console.log("hey bro",data)
            }
        }

    // search 
    $("#compsearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#comptable tr").filter(function() {
            if (value){
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                }
                else{
                    return false
                }
        });
    });
    // search
    //modelfromsubmit
    const handeltlcompSubmit =(e)=>{
            e.preventDefault();
            modeltlSubmit()
            // console.log("cool bro",tissue,tissueid,teacherid,ttype)
    }
    //modelfromsubmit

    return(
        <div>
        <div className="compmaindiv">
        <h3 style={{marginLeft:"280px",fontWeight:600}} className="">Complaints</h3>
        <div className="container mt-5">
        <div className="row">
                <div className="col-8 offset-2 mb-3">
                <div className="compwidgets">
                <form  className="d-flex" role="search">
                    <input id="compsearch" className="form-control  me-2 border border-dark" type="search" placeholder="Search" aria-label="Search" />
                </form>
                {/* <button type="button" className="btn btn-danger my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Issue</button>  */}
                <button className="btn  btn-danger my-2" onClick={handletlOpen}>Apply Complaint</button>
                </div>
                <div className="modaldiv">

                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                <table id="comptable" className="table table-dark table-hover shadow-lg">
                    <thead>
                            <tr>
                            <th scope="col">leave id</th>
                            <th scope="col">reason</th>
                            <th scope="col">no of days</th>
                            <th scope="col">teacher id</th>
                            </tr>
                        </thead>
                        <tbody>
                                {itldata.map(e=>{
                                    return(
                                        <tr key={e.leave_id}>
                                        <th scope="col">{e.leave_id}</th>
                                        <td>{e.reason}</td>
                                        <td>{e.no_of_days}</td>
                                        <td>{e.teacher_id}</td>
                                        </tr> 
                                    )
                                })}
                        </tbody>
                    </table> 
                    </div>
                </div>
            </div>
           <div className="complaintmodel">
                                    <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handletlClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                    backdrop: {
                                        timeout: 500,
                                    },
                                    }}
                                >
                                    <Fade in={open}>
                                    <Box sx={style}>
                                        <div className="modelhead" style={{display:"flex",justifyContent:"space-between"}}>
                                            <h3 style={{fontFamily:"poppins"}}>Complaint Portal</h3>
                                        <button type="submit" className="btn my-2 btn-sm btn-outline-danger ms-auto" onClick={handletlClose}><CloseIcon/></button>
                                        </div>
                                        
                                        <form onSubmit={handeltlcompSubmit}>
                                    <div className="row">
                                        <div className="col-6">
                                        <div className="form-floating mb-3">
                                            <input value={tleaveid} onChange={(e)=>{settleaveid(e.target.value)}} name="isuueid" type="text" className="form-control" id="tlfloatingInput" placeholder="issue id" />
                                            <label htmlFor="tlfloatingInput">Leave Id</label>
                                        </div>
                                        </div>
                                        <div className="col-6">
                                        <div className="form-floating">
                                            <input value={teacherid} onChange={(e)=>{setteacherid(parseInt(e.target.value))}} name="teacherid" type="number" className="form-control" id="tlfloatingPassword" placeholder="student id" />
                                            <label htmlFor="tlfloatingPassword">Teacher Id</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input value={treason} onChange={(e)=>{settreason(e.target.value)}} name="type" type="text" className="form-control" id="tlfloatingType" placeholder="type" />
                                            <label htmlFor="tlfloatingType">Reason</label>
                                        </div>
                                        </div>
                                        <div className="col-12">
                                        <div className="form-floating">
                                            <input value={tnoofdays} onChange={(e)=>{settnoofdays(e.target.value)}} name="issue" type="text" className="form-control" id="tlfloatingIssue" placeholder="issue" />
                                            <label htmlFor="tlfloatingIssue">No of Days</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="submit" onClick={handletlClose} className="btn btn-primary my-2">Apply Leave</button>

                                    </div>
                                    </form>
                                    </Box>
                                    </Fade>
                                </Modal>
            </div>
            
            </div> 


           </div>
           
        
    )
}                        