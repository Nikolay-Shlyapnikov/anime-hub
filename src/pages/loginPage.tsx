import React from 'react';
import LoginForm from "../components/forms/login";
import Header from "../components/header";
import {Link} from "react-router-dom";
function LoginPage() {
    return (
        <div className="loginPage">
            <Header/>
            <LoginForm></LoginForm>
        </div>
    );
}
export default LoginPage;