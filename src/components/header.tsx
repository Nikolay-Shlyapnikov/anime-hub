import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './css/header.css'

const Header = () =>{
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.clear()
        navigate('/');
    }
    const headerContent = user ?
        <div className="page-header__left-side">
            <Link to={'/profile'}>
                <img className={'header__avatar'} src={user.personAvatar}/>
            </Link>
            <div className='page-header__exit-wrapper' onClick={logout}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="533.333px" height="533.333px" viewBox="0 0 533.333 533.333">
                    <g>
                        <path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0
                            h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z"/>
                    </g>
                </svg>
            </div>
        </div> :
        <div className="page-header__left-side">
            <Link to={'/signup'}>
                <svg className='icon profile-link__icon' viewBox="0 0 32 32">
                    <g id="about">
                        <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/>
                        <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/>
                    </g>
                </svg>
            </Link>
            <Link to={'/login'}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="533.333px" height="533.333px" viewBox="0 0 533.333 533.333">
                    <g>
                        <path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0
                            h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z"/>
                    </g>
                </svg>
            </Link>
        </div>
    return(
        <header className="page-header">
            <div className="container">

                <div className="page-header__logo-wrapper">
                    <Link className={'logo__link'} key="logo" to="/">
                        <h1>AnimeHub</h1>
                    </Link>
                </div>
                {headerContent}
            </div>
        </header>
    )
}
export default Header;