import React, {useContext, useState} from "react";
import { AnimatedPage } from "./AnimatedPage";
import { UserContext } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const RegistrationPage = ()=>{
    const rnavigate = useNavigate()
    const[firstname,setfirstname] = useState("")
    const[lastname,setlastname] = useState("")
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[sex,setsex] = useState("")
    const[phonenumber,setphonenumber] = useState(0)
    const[adress,setadress] = useState("")
    const[parentname,setparentname] = useState("")
    const[dob,setdob] = useState("") 
    const [, settoken] = useContext(UserContext)

    const submitResponse = async()=>{
        const requestOptions = {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "hashpassword": password,
                "sex": sex,
                "adress": adress,
                "phone": phonenumber,
                "parentname": parentname,
                "DOB": dob,
                "DOJ": dob
        }
        try{
        const response = await axios.post("http://127.0.0.1:8000/create", requestOptions)        
        settoken(response.data.access_token)
        rnavigate("/studentsignin")
        }catch(err){
            console.log(err.response.data.detail)
        }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(password>5){
            submitResponse();
        }
    }
    
    return(
        <AnimatedPage>
        <>

            <section className="sec1">
                
                {/* <!-- main component --> */}
                <main>
                    <div className="container">
                        <div className="row">

                            <div className="col-2">
                                <div className="contacticons">
                                    <div className="mail">
                                        <img className="" style={{width:"43px"}} src="assets/images/icons8-gmail-logo-64.png" alt="" />
                                    </div>
                                    <div className="skype">
                                        <img style={{width:"43px"}} src="assets/images/icons8-skype-2019-64.png" alt="" />
                                    </div>
                                    <div className="discord">
                                        <img style={{width:"43px"}} src="assets/images/icons8-discord-64.png" alt="" />
                                    </div>
                                </div>
                            </div>

                            <div className="mainimg2div col-6">
                                <div className="mainimg2">
                                    <img className="mx-auto regimg1" src="assets/images/cr1wobg.png" alt="chacter" />
                                </div>
                                {/* <div className="floatingicons">
                                    <img className='fi mx-auto' id="ibook" style={{}} src="assets/images/icons8-bookmark-64.png" alt="floatingicons" />
                                    <img className='fi mx-auto' id="ipuzzle" style={{}} src="assets/images/icons8-puzzle-64.png" alt="floatingicons" />
                                    <img className='fi mx-auto' id="iprize" style={{}} src="assets/images/icons8-prize-64.png" alt="floatingicons" />
                                    <img className='fi mx-auto' id="iphysics" style={{}} src="assets/images/icons8-physics-64.png" alt="floatingicons" />
                                </div> */}
                            </div>

                            <div className="col-4">
                                <div className="loginform my-5" style={{width:"300px"}}>
                                    {/* register form */}
                                    <form  id="lgform"  onSubmit={handleSubmit}  className="mt-4" action="" method="">
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="text" value={firstname} onChange={(e)=>setfirstname(e.target.value)} className="em fn form-control" id="firstname" placeholder="First Name" />
                                                    <label htmlFor="firstname">First Name</label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="text" value={lastname} onChange={(e)=>setlastname(e.target.value)} className="em ln form-control" id="lastname" placeholder="Last Name" />
                                                    <label htmlFor="lastname">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-2 email">
                                            <input style={{height:"50px"}} type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="em form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating">
                                            <input style={{height:"50px"}} value={password} type="password" onChange={(e)=>setpassword(e.target.value)} className="em password form-control" id="floatingPassword" placeholder="Password" />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>

                                        <div className='row mt-2'>
                                        <div className='col-6'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="text" value={parentname} onChange={(e)=>setparentname(e.target.value)} className="em fn form-control" id="uparentname" placeholder="parentname" />
                                                    <label htmlFor="uparentname">Parent Name</label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="number" value={phonenumber} onChange={(e)=>setphonenumber(parseInt(e.target.value))} className="em ln form-control" id="uphonenumber" placeholder="phonenumber" />
                                                    <label htmlFor="uphonenumber">Ph Number</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-4'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="text" value={sex} onChange={(e)=>setsex(e.target.value)} className="em fn form-control" id="sex" placeholder="sex" />
                                                    <label htmlFor="sex">Sex</label>
                                                </div>
                                            </div>
                                            <div className='col-4'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="text" value={adress} onChange={(e)=>setadress(e.target.value)} className="em ln form-control" id="adress" placeholder="adress" />
                                                    <label htmlFor="adress">City</label>
                                                </div>
                                            </div>
                                            <div className='col-4'>
                                                <div className="form-floating mb-2 email">
                                                    <input style={{height:"50px"}} type="date" value={dob} onChange={(e)=>setdob(e.target.value)} className="em ln form-control" id="udob" placeholder="dob" />
                                                    <label htmlFor="udob">DOB</label>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="line3 my-3">
                                            <button type="submit" className="sgbtn btn btn-primary w-100 shadow">Register</button>
                                        </div>
                                        {/* <div className="line4 text-center my-2">
                                            <div className="lghr">or register with</div>
                                        </div> */}
                                        {/* <div className="line5 my-4">
                                            <div className="google lgopt shadow">
                                                <img width="60" src="assets/images/g-logo.png" alt="google" />
                                            </div>
                                            <div className="apple lgopt shadow">
                                                <img style={{width:"25px"}} src="assets/images/a-logo.png" alt="google" />
                                            </div>
                                            <div className="fb lgopt shadow">
                                                <img style={{width:"35px"}} src="assets/images/f-logo.png" alt="google" />
                                            </div>
                                        </div> */}
                                        <div>
                                            <div className="recpass text-primary" id="loginbtn"><span className="text-dark me-2">already have an account?</span><NavLink style={{textDecoration:"none",fontFamily:"poppins",fontWeight:"700"}} className="text-primary" to="/studentsign">Log In</NavLink></div>
                                        </div>
                                    </form>
                                    {/* register form */}
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
                {/* <!-- main component --> */}

                {/* <!-- footer component --> */}

                {/* <!-- footer component --> */}
            </section>

        </>
        </AnimatedPage>
    )
}