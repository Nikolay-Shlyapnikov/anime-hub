import React from 'react';
import SignupForm from "../components/forms/signup";
import Header from "../components/header";
function SignupPage() {
    return (
        <div className="loginPage">
            <Header/>
            <SignupForm></SignupForm>
        </div>
    );
}
export default SignupPage;