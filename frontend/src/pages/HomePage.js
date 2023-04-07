import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";

export const HomePage = ()=>{
    return(
        <>
            <section className="homesection">
                <div className="container homecon">
                    <div className="row">
                        <div className="col-4">
                            <div className="htextdiv">
                                <div className="ht1">lets make</div> 
                                <div className="ht2">your dream</div>  
                                <div className="ht3">come true</div> 
                                <div className="ht4">
                                <button className="button mt-3 ms-4" style={{fontFamily:"poppins", fontWeight:"500"}}>
                                    <NavLink style={{color:"white", textDecoration:"none",fontFamily:"poppins"}} to="/register">Join Now</NavLink>
                                </button>    
                                </div> 

                            </div>
                        </div>
                        <div className="col-4">
                            <div className="himgdiv">
                            <div className="himg1">
                                <img className="artroomgif" src="assets/images/bgimag1.png" alt="roomgif"/>
                            </div>
                            <div className="himg2">
                                <img className="bgchar1" src="assets/images/char3.png" alt="roomgif"/>
                            </div>
                            </div>
                        </div>
                        <div className="col-2">

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}