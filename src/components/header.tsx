import React from 'react';
import {Link, useLocation} from "react-router-dom";
import './css/header.css'
interface headerPropsInterface {
    registrationLink: React.ComponentElement<any, any>;
    loginLink: React.ComponentElement<any, any>;
}
const Header = (headerProps: headerPropsInterface) =>{
    const location = useLocation();
    let registration;
    location.state ? registration = location.state : registration = false;
    return(
        <header className="page-header">
            <div className="container">

                <div className="page-header__logo-wrapper">
                    <Link className={'logo__link'} key="logo" to="/">
                        <h1>AnimeHub</h1>
                    </Link>
                </div>

                <div className="page-header__left-side">
                    { headerProps.registrationLink }
                    { headerProps.loginLink }
                </div>
            </div>
        </header>
    )
}
export default Header;