import React from 'react';
import {Link} from "react-router-dom";
import Header from "../components/header";
function mainPage() {
    return (
        <body>
            <Header
            registrationLink={
                <Link style={{ display: 'block' }} id="link" key="link" to="/Signup">Регистрация</Link>

            }
            loginLink={
                <Link style={{ display: 'block' }} id="link" key="link" to="/Login">Вход</Link>
            }
            />



            <div className="mainPage">

            </div>
        </body>

    );
}

export default mainPage