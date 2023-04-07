import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { AnimatedPage } from './AnimatedPage';
import { ErrorMsg } from './ErrorMsgPage';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'

export const AdminLoginPage = ()=>{
    const [ademail,setademail] = useState("")
    const navigate = useNavigate()
    const [adpassword,setadpassword] = useState("")
    const [errorMsg, seterrorMsg] = useState("")
    const [,setadtoken] =  useContext(UserContext)

    const submitadLogin = async()=>{
        const requestOptions = {
            method:"POST",
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            body:JSON.stringify(`grant_type=&username=${ademail}&password=${adpassword}&scope=&client_id=&client_secret=`)   
        }
        const response = await fetch("http://127.0.0.1:8001/token", requestOptions)
        const data = await response.json()

        if(!response.ok){
            seterrorMsg(data.detail)
        }
        else{
            setadtoken(data.access_token)
            localStorage.setItem("adminToken", data.access_token);
            navigate("/dashboard")
        }

    }
    const handleadSubmit = (e)=>{
        e.preventDefault();
        submitadLogin();
    }
    return(
        <AnimatedPage>
        <>

            <section className="sec1">
                
                {/* <!-- main component --> */}
                <main className='lgmaindiv'>
                <div className='bgimagediv'>
                    <img id='stlbgimage' className='stlbgimage' src='assets/images/stlbgimg.png' alt='stlbgimage'/>
                </div>
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

                            <div className="col-6 my-4">
                                <div className="mainimg">
                                    <img className='character1' src="assets/images/character.png" alt="chacter" />
                                </div>
                            </div>

                            <div className="col-4 my-5">
                                <div className="loginform my-5" style={{width:"300px"}}>

                                    <form  id="lgform"  onSubmit={handleadSubmit} className="" action="" method="">
                                        <div className="form-floating mb-4 email">
                                            <input style={{height:"50px"}} type="email" value={ademail} onChange={(e)=>{setademail(e.target.value)}} className="em form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating">
                                            <input style={{height:"50px"}} value={adpassword} onChange={(e)=>{setadpassword(e.target.value)}} type="password" className="em password form-control" id="floatingPassword" placeholder="Password" />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                    
                
                                    <div className="line2">
                                        {/* <div className="my-3">
                                                <input type="checkbox" className="me-1" id="cb" />
                                                <label htmlFor="cb"><span className="stsg">stay sign in</span></label>
                                        </div>
                                        <div>
                                            <a className="recpass" href="#">RecoveryPassword</a>
                                        </div> */}
                                        <ErrorMsg message={errorMsg}/>
                                    </div>
                                    <div className="line3 my-3">
                                        <button type="submit" className="sgbtn btn btn-primary w-100 shadow">SIGN IN</button>
                                    </div>
                                    {/* <div className="line4 text-center my-2">
                                        <div className="lghr">or Sign in with</div>
                                    </div>
                                    <div className="line5 my-4">
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
                                        <Link className="recpass text-primary" id="registerbtn" to="/register"><span className="text-dark me-2">don't have an account yet?</span>Register</Link>
                                    </div>
                                    </form>

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