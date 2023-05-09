import React from 'react';
import SignupForm from "../components/forms/signup";
import Header from "../components/header";
import {Link} from "react-router-dom";
function SignupPage() {
    return (
        <div className="loginPage">
            <Header
                registrationLink={<Link style={{display:'block'}} key="signup" to="/Signup">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <g data-name="Layer 2" id="Layer_2">
                                <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"/>
                                <path d="M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z"/>
                                <path d="M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.39,13.39,0,0,1,9.82,4.32A1,1,0,0,1,25.55,24Z"/>
                            </g>
                        </svg>
                    </Link>}
                loginLink={<Link style={{display:'block'}} key="login" to="/Login">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title/>
                            <g id="logout">
                                <line className="cls-1" x1="15.92" x2="28.92" y1="16" y2="16"/>
                                <path d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z"/>
                                <line className="cls-1" x1="28.92" x2="24.92" y1="16" y2="20"/>
                                <line className="cls-1" x1="28.92" x2="24.92" y1="16" y2="12"/>
                                <line className="cls-1" x1="24.92" x2="24.92" y1="8.09" y2="6.09"/>
                                <line className="cls-1" x1="24.92" x2="24.92" y1="26" y2="24"/>
                            </g>
                        </svg>
                    </Link>}
            />
            <SignupForm></SignupForm>
        </div>
    );
}
export default SignupPage;