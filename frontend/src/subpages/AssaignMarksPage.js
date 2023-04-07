import React, {useEffect, useState, useContext} from "react";
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
import { UserContext } from "../context/UserContext";

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

export const AssaignMarksPage = ()=>{
    const [mdata, setmdata] = useState([])
    const [token] = useContext(UserContext)
    const[resultid,setresultid]=useState(0)
    const[grade,setgrade]=useState("")
    const[marks,setmarks]=useState("")
    const[studentid,setstudentid]=useState(0)
    const [open, setOpen] = React.useState(false);
     const handletmOpen = () => setOpen(true);
    const handletmClose = () => setOpen(false);
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

    const submitMarksData = async()=>{
        const responseOptions = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    "results_id": resultid,
                    "grade": grade,
                    "marks": marks,
                    "student_id": studentid
                }
            )
        }
        const response = await fetch("http://127.0.0.1:8000/student/results", responseOptions)
        const data = await response.json()

        if(!response.ok){
            console.log({"error":data.detail})
        }
        else{
            console.log(data)
        }
    }

    const handleMarkSubmit = (e)=>{
        e.preventDefault();
        submitMarksData()
        // console.log("cool bro", resultid, grade, marks, studentid)
    }

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
                    {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                </form>
                <button className="btn  btn-danger my-2" onClick={handletmOpen}>Add Marks</button>
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
        <div className="addmarksmodel">

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handletmClose}
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
                            <h3 style={{fontFamily:"poppins"}}>Marks Portel</h3>
                        <button type="submit" className="btn my-2 btn-sm btn-outline-danger ms-auto" onClick={handletmClose}><CloseIcon/></button>
                        </div>
                        
                        <form onSubmit={handleMarkSubmit}>
                    <div className="row">
                        <div className="col-6">
                        <div className="form-floating mb-3">
                            <input value={resultid} onChange={(e)=>{setresultid(e.target.value)}} name="resultid" type="text" className="form-control" id="tmfloatingInput" placeholder="result id" />
                            <label htmlFor="tmfloatingInput">Result Id</label>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="form-floating">
                            <input value={grade} onChange={(e)=>{setgrade(e.target.value)}} name="grade" type="text" className="form-control" id="tmfloatingPassword" placeholder="grade" />
                            <label htmlFor="tmfloatingPassword">Grade</label>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <div className="form-floating mb-3">
                            <input value={marks} onChange={(e)=>{setmarks(parseInt(e.target.value))}} name="marks" type="number" className="form-control" id="tmfloatingType" placeholder="marks" />
                            <label htmlFor="tmfloatingType">Marks</label>
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="form-floating">
                            <input value={studentid} onChange={(e)=>{setstudentid(parseInt(e.target.value))}} name="studentid" type="number" className="form-control" id="tmfloatingIssue" placeholder="studentid" />
                            <label htmlFor="tmfloatingIssue">Student Id</label>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="submit" onClick={handletmClose} className="btn btn-primary my-2">Add Marks</button>

                    </div>
                    </form>
                    </Box>
                    </Fade>
                </Modal>

        </div>
        </>
    )
}