import React from 'react';
import SignupForm from "../components/forms/signup";
import Header from "../components/header";
import {Link} from "react-router-dom";
function SignupPage() {
    return (
        <div className="loginPage">
            <Header/>
            <SignupForm></SignupForm>
        </div>
    );
}
export default SignupPage;