import React from "react";

export const NavbarPage = ()=>{
    return(
        <>
        
            {/* <!-- navbar component --> */}
            <header>
                    <nav>
                        <div class="logo">
                            <ul class="logolinks">
                                <li>Indra</li>
                            </ul>
                        </div>
                        <div class="navopts">
                            <ul class="navlinks">
                                <li>Home</li>
                                <li>Dashboard</li>
                                <li>Instructers</li>
                                <li>Courses</li>
                            </ul>
                        </div>
                        <div class="registration">
                            <ul class="reglinks">
                                <li>Sign In</li>
                                <li>Register</li>
                            </ul>
                        </div>
                    </nav>
                </header>
                {/* <!-- navbar component --> */}
        
        </>
    )
}