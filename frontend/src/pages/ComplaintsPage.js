import React, {useContext, useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/UserContext";
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

export const ComplaintsPage = ()=>{
    const [idata, setidata] = useState([])
    const [token] = useContext(UserContext)
    const [issueid, setissueid] = useState("")
    const [issue,setissue] = useState("")
    const [type,settype] = useState("")
    const [studentid,setstudentid]= useState(0)
    // const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                console.log(data["stuissues"])
                setidata(data["stuissues"])
            }
        }
        fetchUser();
    },[token])

    const modelSubmit = async()=>{
            const requestOptions = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "issue_id":issueid,
                    "issue":issue,
                    "type":type,
                    "student_id":studentid
                })
            }
            const response = await fetch("http://127.0.0.1:8000/student/issues", requestOptions)
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
    const handelcompSubmit =(e)=>{
            e.preventDefault();
            modelSubmit()
            // console.log(JSON.stringify({"issue":issue,"issueid":issueid,"type":type,"studentid":studentid}))
            // console.log("cool bro",{"issue":issue,"issueid":issueid,"type":type,"studentid":studentid})
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
                <button className="btn  btn-danger my-2" onClick={handleOpen}>Apply Complaint</button>
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
                            <th scope="col">issue id</th>
                            <th scope="col">issue</th>
                            <th scope="col">type</th>
                            <th scope="col">student id</th>
                            </tr>
                        </thead>
                        <tbody>
                                {idata.map(e=>{
                                    return(
                                        <tr key={e.issue_id}>
                                        <th scope="col">{e.issue_id}</th>
                                        <td>{e.issue}</td>
                                        <td>{e.type}</td>
                                        <td>{e.student_id}</td>
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
                                    onClose={handleClose}
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
                                        <button type="submit" className="btn my-2 btn-sm btn-outline-danger ms-auto" onClick={handleClose}><CloseIcon/></button>
                                        </div>
                                        
                                        <form onSubmit={handelcompSubmit}>
                                    <div className="row">
                                        <div className="col-6">
                                        <div className="form-floating mb-3">
                                            <input value={issueid} onChange={(e)=>{setissueid(e.target.value)}} name="isuueid" type="text" className="form-control" id="floatingInput" placeholder="issue id" />
                                            <label htmlFor="floatingInput">Issue Id</label>
                                        </div>
                                        </div>
                                        <div className="col-6">
                                        <div className="form-floating">
                                            <input value={studentid} onChange={(e)=>{setstudentid(parseInt(e.target.value))}} name="studentid" type="number" className="form-control" id="floatingPassword" placeholder="student id" />
                                            <label htmlFor="floatingPassword">Student Id</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input value={type} onChange={(e)=>{settype(e.target.value)}} name="type" type="text" className="form-control" id="floatingType" placeholder="type" />
                                            <label htmlFor="floatingType">Type</label>
                                        </div>
                                        </div>
                                        <div className="col-12">
                                        <div className="form-floating">
                                            <input value={issue} onChange={(e)=>{setissue(e.target.value)}} name="issue" type="text" className="form-control" id="floatingIssue" placeholder="issue" />
                                            <label htmlFor="floatingIssue">Issue</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="submit" onClick={handleClose} className="btn btn-primary my-2">Add Complaint</button>

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