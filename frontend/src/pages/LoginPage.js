import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { AnimatedPage } from './AnimatedPage';
import { ErrorMsg } from './ErrorMsgPage';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

export const LoginPage = ()=>{
    const [email,setemail] = useState("")
    const navigate = useNavigate()
    const [password,setpassword] = useState("")
    // const [hashpassword, sethashpassword] = useState("")
    const [errorMsg, seterrorMsg] = useState("")
    const [,settoken] =  useContext(UserContext)

    const submitLogin = async()=>{
        const requestOptions = `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
        try{    
        const response = await axios.post("http://127.0.0.1:8000/token", requestOptions)
            settoken(response.data.access_token)
            localStorage.setItem("studentToken", response.data.access_token);
            navigate("/dashboard")
        }catch(err){
            console.log(err.response.data.detail)
            seterrorMsg(err.response.data.detail)
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        submitLogin();
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

                                    <form  id="lgform"  onSubmit={handleSubmit} className="" action="" method="">
                                        <div className="form-floating mb-4 email">
                                            <input style={{height:"50px"}} type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} className="em form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating">
                                            <input style={{height:"50px"}} value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" className="em password form-control" id="floatingPassword" placeholder="Password" />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                    
                
                                    <div className="line2">
                                        <div className="my-3">
                                                <input type="checkbox" className="me-1" id="cb" />
                                                <label htmlFor="cb"><span className="stsg">stay sign in</span></label>
                                        </div>
                                        <div>
                                            <div className="recpass text-primary float-end" >RecoveryPassword</div>
                                        </div> 
                                        <ErrorMsg message={errorMsg}/>
                                    </div>
                                    <div className="line3 my-3">
                                        <button type="submit" className="sgbtn btn btn-primary w-100 shadow">SIGN IN</button>
                                    </div>
                                    {/*<div className="line4 text-center my-2">
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