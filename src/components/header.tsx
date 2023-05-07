import React from 'react';
import {useLocation} from "react-router-dom";

interface headerPropsInterface {
    registrationLink: React.ComponentElement<any, any>;
    loginLink: React.ComponentElement<any, any>;
}
const Header = (headerProps: headerPropsInterface) =>{
    const location = useLocation();
    let registration;
    location.state ? registration = location.state : registration = false;
    return(
        <header>
            <div className={'container'}>

                {headerProps.loginLink}
                {headerProps.registrationLink}
            </div>
        </header>
    )
}
export default Header;