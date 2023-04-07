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

export const TComplaintsPage = ()=>{
    const [itdata, setitdata] = useState([])
    const [ttoken,settoken] = useState(localStorage.getItem("teacherToken"))
    const [tissueid, settissueid] = useState("")
    const [tissue,settissue] = useState("")
    const [ttype,setttype] = useState("")
    const [teacherid,setteacherid]= useState(0)
    // const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
     const handletOpen = () => setOpen(true);
    const handletClose = () => setOpen(false);

    useEffect(()=>{
        const fetchUser = async()=>{
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
                console.log(data["teachissues"])
                setitdata(data["teachissues"])
            }
        }
        fetchUser();
    },[ttoken])

    const modeltSubmit = async()=>{
            const requestOptions = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                      "issue_id": tissueid,
                      "issue": tissue,
                      "type": ttype,
                      "teacher_id": teacherid
                    })
            }
            const response = await fetch("http://127.0.0.1:8002/teacher/issues", requestOptions)
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
    const handeltcompSubmit =(e)=>{
            e.preventDefault();
            modeltSubmit()
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
                <button className="btn  btn-danger my-2" onClick={handletOpen}>Apply Complaint</button>
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
                            <th scope="col">teacher id</th>
                            </tr>
                        </thead>
                        <tbody>
                                {itdata.map(e=>{
                                    return(
                                        <tr key={e.issue_id}>
                                        <th scope="col">{e.issue_id}</th>
                                        <td>{e.issue}</td>
                                        <td>{e.type}</td>
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
                                    onClose={handletClose}
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
                                        <button type="submit" className="btn my-2 btn-sm btn-outline-danger ms-auto" onClick={handletClose}><CloseIcon/></button>
                                        </div>
                                        
                                        <form onSubmit={handeltcompSubmit}>
                                    <div className="row">
                                        <div className="col-6">
                                        <div className="form-floating mb-3">
                                            <input value={tissueid} onChange={(e)=>{settissueid(e.target.value)}} name="isuueid" type="text" className="form-control" id="tfloatingInput" placeholder="issue id" />
                                            <label htmlFor="tfloatingInput">Issue Id</label>
                                        </div>
                                        </div>
                                        <div className="col-6">
                                        <div className="form-floating">
                                            <input value={teacherid} onChange={(e)=>{setteacherid(parseInt(e.target.value))}} name="teacherid" type="number" className="form-control" id="tfloatingPassword" placeholder="student id" />
                                            <label htmlFor="tfloatingPassword">Teacher Id</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input value={ttype} onChange={(e)=>{setttype(e.target.value)}} name="type" type="text" className="form-control" id="tfloatingType" placeholder="type" />
                                            <label htmlFor="tfloatingType">Type</label>
                                        </div>
                                        </div>
                                        <div className="col-12">
                                        <div className="form-floating">
                                            <input value={tissue} onChange={(e)=>{settissue(e.target.value)}} name="issue" type="text" className="form-control" id="tfloatingIssue" placeholder="issue" />
                                            <label htmlFor="tfloatingIssue">Issue</label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="submit" onClick={handletClose} className="btn btn-primary my-2">Add Complaint</button>

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