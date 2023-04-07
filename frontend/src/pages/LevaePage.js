import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import $ from "jquery";
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


export const LeavePage = ()=>{
    const [ldata, setldata] = useState([])
    const [token] = useContext(UserContext)
    const [leaveid, setleaveid] = useState("")
    const [reason, setreason] = useState("")
    const [noofdays, setnoofdays] = useState(0)
    const [studentid, setstudentid] = useState(0)
    const [lopen, setlOpen] = React.useState(false);
    //  const handleOpen = () => setlOpen(true);
    const lhandleClose = () => setlOpen(false);
    
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
                console.log(data["stuleaves"])
                setldata(data["stuleaves"])
            }
        }
        fetchUser();
    },[token])

    // search 
    $("#leavesearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#leavetable tr").filter(function() {
            if (value){
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                }
                else{
                    return false
                }
        });
    });
    // search

    const submitLeavemodel = async()=>{
        const responseOptions = {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                "leave_id":leaveid,
                "reason":reason,
                "no_of_days":noofdays,
                "student_id":studentid
            })

        }
        const response = await fetch("http://127.0.0.1:8000/student/leaves",responseOptions)
        const data = await response.json()
        if(!response.ok){
            console.log({"error":data.detail})
        }
        else{
            console.log(data)
        }
    }

    const handleLeaveSubmit=(e)=>{
        e.preventDefault();
        submitLeavemodel()
    }
    return(
        <>
        <h3 style={{marginLeft:"280px",fontWeight:600}} className="">Apply Leave</h3>
        <div className="container mt-5">
        <div className="row">
                <div className="col-8 offset-2 mb-3">
                <div className="leavewidgets">
                <form className="d-flex" role="search">
                    <input id="leavesearch" className="form-control me-2 border border-dark " type="search" placeholder="Search" aria-label="Search" />
                </form>
                <button type="button" className="btn leavebtn my-2 btn-primary" onClick={()=>{setlOpen(true)}}>Apply leave</button>
                </div>
                <div className="modaldiv">

                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                <table id="leavetable" className="table table-dark table-hover shadow-lg">
                    <thead>
                            <tr>
                            <th scope="col">leave id</th>
                            <th scope="col">reason</th>
                            <th scope="col">no of days</th>
                            <th scope="col">student id</th>
                            </tr>
                        </thead>
                        <tbody>
                                {ldata.map(e=>{
                                    return(
                                        <tr key={e.leave_id}>
                                        <th scope="col">{e.leave_id}</th>
                                        <td>{e.reason}</td>
                                        <td>{e.no_of_days}</td>
                                        <td>{e.student_id}</td>
                                        </tr> 
                                    )
                                })}
                        </tbody>
                    </table> 
                    <div className="leavemodaldiv">
                    <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={lopen}
                                    onClose={lhandleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                    backdrop: {
                                        timeout: 500,
                                    },
                                    }}
                                >
                                    <Fade in={lopen}>
                                    <Box sx={style}>
                                        <h3 className="leavemodelhead" style={{display:"flex",justifyContent:"space-between"}}>                                       
                                            <div style={{fontFamily:"poppins"}}>Leave Portal</div>                     
                                        <button type=""  className="btn leavebtnclose  btn-sm btn-outline-danger ms-auto" onClick={lhandleClose}><CloseIcon/></button>
                                        </h3>
                                        
                                        <form id="leavemodelform" onSubmit={handleLeaveSubmit}>
                                        <div className="row">
                                        <div className="col-6">
                                        <div className="form-floating mb-3">
                                            <input value={leaveid} onChange={(e)=>{setleaveid(e.target.value)}} name="leaveid" type="text" className="form-control" id="lfloatingInput" placeholder="leave id" />
                                            <label htmlFor="lfloatingInput">Leave Id</label>
                                        </div>
                                        </div>
                                        <div className="col-6">
                                        <div className="form-floating">
                                            <input value={studentid} onChange={(e)=>{setstudentid(parseInt(e.target.value))}} name="studentid" type="number" className="form-control" id="lfloatingPassword" placeholder="student id" />
                                            <label htmlFor="lfloatingPassword">Student Id</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input value={reason} onChange={(e)=>{setreason(e.target.value)}} name="reason" type="text" className="form-control" id="lfloatingReason" placeholder="reason" />
                                            <label htmlFor="lfloatingReason">Reason</label>
                                        </div>
                                        </div>
                                        <div className="col-12">
                                        <div className="form-floating">
                                            <input value={noofdays} onChange={(e)=>{setnoofdays(parseInt(e.target.value))}} name="noofdays" type="number" className="form-control" id="lfloatingnoofdays" placeholder="noofdays" />
                                            <label htmlFor="lfloatingnoofdays">No of Days</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="submit" onClick={lhandleClose} className="btn btn-primary my-2">Apply Leave</button>

                                    </div>
                                    </form>
                                    </Box>
                                    </Fade>
                                </Modal>

                          
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Button trigger modal --> */}

        </>
    )
}