import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "../context/UserContext";
import CommitRoundedIcon from '@mui/icons-material/CommitRounded';
import { Line } from 'react-chartjs-2';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
// import PowerInputIcon from '@mui/icons-material/PowerInput';
// import $ from "jquery";
import {Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js/auto';
ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

export const AnalyticsPage = ()=>{
    const [token] = useContext(UserContext)
    const [data, setdata] = useState({})
    const[days,setdays]=useState(0)
    const[grade,setgrade]=useState("")
    const[leave,setleave]=useState(0)
    const[datavalues,setdatavalues] = useState([])
    useEffect(()=>{
        const fetchUser = async()=>{
            const requestOptions = {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("studentToken"),
                },
            }
            const response = await fetch("http://127.0.0.1:8000/token/decoder", requestOptions)
            const data = await response.json()
            if(!response.ok){
                console.log({"error":data.detail})
                console.log(localStorage.getItem("studentToken"))
            }
            else{
                setdata(data)
                setdays(data["stuattendence"].length)
                setgrade(data["sturesults"][0]["grade"])
                setleave(data["stuleaves"].length)
                setdatavalues(data["sturesults"].map(e=>{
                    return e.marks
                }))
            }
        }
        fetchUser();
    },[token])
    
    const lineData = {
        labels:['Jan','Feb','Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
        datasets:[{
            label:"Months",
            data:datavalues,
            backgroundColor:"transparent",
            borderColor:"blue",
            pointBorderColor:"transparent",
            pointBorderWidth:4,
            tension: 0.5
        }]
    }       
    const options = {
        plugins:{
            legend:{
                display:false,
            },
        },
        scales:{
            x:{
                grid:{
                    display:false
                },
                ticks:{
                    color:''
                }
            },
            y:{
                grid:{
                    display:false
                },
                // min: 2,
                // max: 10,
                ticks: {
                    // stepSize: 2,
                    callback: (value)=> value + " M",
                    color:'',
                }, 
                // grid:{
                //     borderDash: [10]
                // }
            }
        },
    }
    ChartJs.defaults.font.weight='bold'
    ChartJs.defaults.font.family='poppins'

    return(
        <>
            <div className="container" style={{marginLeft:"255px"}}>
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-4">
                                {/* card1 */}
                                <div className="card card1 shadow">
                                    <div className="head card-header">
                                        Attendance<div className="ms-5" style={{display:"inline-block"}}><CommitRoundedIcon/></div>
                                        <div className="subtext">no of present days</div>
                                    </div>
                                    <div className="cb card-body">
                                        <span className="cbody card-title">
                                        <span style={{verticalAlign:"middle",fontSize:"20px"}} className="material-symbols-rounded mx-2 mb-2"> hot_tub </span>{days}
                                        </span>
                                    </div>
                                    </div>
                                {/* card1 */}
                            </div>
                            <div className="col-4">
                                {/* card2 */}
                                <div className="card card2 shadow">
                                    <div className="head card-header fw-2">
                                        Results<div className=""style={{display:"inline-block",marginLeft:"85px"}}><CommitRoundedIcon/></div>
                                        <div className="subtext">recent grade</div>
                                    </div>
                                    <div className="cb card-body">
                                        <span className="cbody card-title">
                                        <span style={{verticalAlign:"middle"}} className="material-symbols-outlined mx-2">military_tech</span>{grade}
                                        </span>
                                    </div>
                                    </div>
                                {/* card2 */}

                            </div>
                            <div className="col-4">
                                {/* card3 */}
                                <div className="card card3 shadow">
                                    <div className="head card-header">
                                        Leaves <div className="" style={{display:"inline-block",marginLeft:"85px"}}><CommitRoundedIcon/></div>
                                        <div className="subtext">no of leaves</div>
                                    </div>
                                    <div className="cb card-body">
                                        <span className="cbody card-title">
                                        <span style={{verticalAlign:"middle",fontSize:"18px"}} className="material-symbols-rounded mx-2 mb-1">event_note</span>{leave}
                                        </span>
                                    </div>
                                    </div>
                                {/* card3 */}
                            </div>
                            <div className="row">
                                <div className="col-12" >
                                    {/* card4 */}
                                <div className="card card4 shadow" style={{background:"#F9F9F8"}}> 
                                    <div className="border-bottom border-bottom-primary border-bottom-1" style={{display:"flex",justifyContent:"space-between"}}>
                                    <div className=" mx-3 my-3" style={{fontWeight:"600"}}>Statistics</div>
                                    <div className="me-3 mt-3" style={{}}><ShowChartRoundedIcon/></div>
                                    </div>
                                    <div className="card-body">
                                    <Line
                                        data={lineData}
                                        options = {options}
                                        height={200}
                                        width={700}
                                        // options={{
                                        //     maintainAspectRatio:false
                                        // }}
                                    />  
                                    </div>
                                    </div>
                                {/* card4 */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {/* card5 */}
                        <div className="card card5 shadow">
                                    <div className="head card-header">
                                        Events<span style={{marginLeft:"125px"}}><BlurOnIcon/></span>
                                    </div>
                                    
                                        
                                        {/* corousel */}
                                        <div id="carouselExample" className="carousel slide m-1">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active">
                                                    <img style={{height:"307.552px"}} src="assets/images/library.jpg" className="d-block w-100 rounded" alt="a"/>
                                                    <div style={{fontWeight:"600",fontSize:"14px"}} className="mt-2 mx-1">Library Event</div>
                                                    </div>
                                                    <div className="carousel-item">
                                                    <img style={{height:"307.552px"}} src="assets/images/diwali.jpg" className="d-block w-100 rounded" alt="b"/>
                                                    <div style={{fontWeight:"600",fontSize:"14px"}} className="my-2 mx-1">Diwali Event</div>
                                                    </div>
                                                    <div className="carousel-item">
                                                    <img style={{height:"307.552px"}} src="assets/images/birthday.jpg" className="d-block w-100 rounded" alt="c"/>
                                                    <div style={{fontWeight:"600",fontSize:"14px"}} className="my-2 mx-1">Birthday Event</div>
                                                    </div>
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                            
                                        {/* corousel */}

                                    </div>
                                    </div>
                                {/* card5 */}
                    </div>
                    <div className="row">
                        <div className="col-8">

                        {/* card6 */}
                        <div className="card mt-3 shadow" style={{width:"708.667px"}}>
                            <div className="card-body fw-bold">
                            <span style={{color:"red"}}><DonutLargeIcon/></span> <span className="mx-3">Teachers: 50</span> |<span className="mx-2">Students: 100</span>| <span className="mx-3">Branches: 5</span>|
                            <span className="mx-3">
                                follow us:
                                <img className="mx-2" src="assets/images/icons8-gmail-logo-64.png" style={{width:"25px"}} alt="mail"/>
                                <img className="mx-2" src="assets/images/icons8-skype-2019-64.png" style={{width:"25px"}} alt="mail"/>
                                <img className="ms-2" src="assets/images/icons8-discord-64.png" style={{width:"25px"}} alt="mail"/>
                            </span>
                            </div>
                            </div>
                        {/* card6 */}
                        </div>
                        <div className="col-4">
                            <div className="">
                               <span className="ms-5">connect</span> <img className="" src="assets/images/stlbgimg.png" style={{width:"65px"}} alt=""/><span className="mx-3">STL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}