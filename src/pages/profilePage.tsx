import React, {useState} from 'react';
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import '../components/css/style.css'
import '../components/css/null.css'
import '../components/css/profile.css'
import Playlist from "../components/playlist";
interface profilePageInterface {
    XXX: boolean;
}
function ProfilePage() {
    const location = useLocation();
    const userInfo = location.state;
    const [XXX, setXXX] = useState<boolean>(false);
    let countPlaylist = 5;
    let countReview = 10;
    const options ={
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            userId: userInfo.personId
        })
    }
    // fetch('url', options)
    //     .then(response => response.json())
    //     .then(data =>{
    //         countPlaylist = data.playList;
    //         countReview = data.review;
    //     });
    const changeXXX = () => setXXX(!XXX);
    return (
        <div>
            <Header
                registrationLink={
                    <Link style={{ display: 'block' }} key="signup" to="/Signup">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <g data-name="Layer 2" id="Layer_2">
                                <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"/>
                                <path d="M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z"/>
                                <path d="M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.39,13.39,0,0,1,9.82,4.32A1,1,0,0,1,25.55,24Z"/>
                            </g>
                        </svg>
                    </Link>
                }
                loginLink={
                    <Link style={{ display: 'block' }} key="login" to="/Login">
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
                    </Link>
                }
            />
            <main className="profile__container container">
                <div className='profile__name-wrapper'>
                    <h1 className='profile__name'>{userInfo.personLogin}, {userInfo.personAge}</h1>
                </div>
               <div className='user__info-wrapper'>
                   <div className='profile__left-side'>
                       <img className='profile__avatar' src={''} alt='Фото профиля'/>
                       <p className='profile__text'>
                           <svg className={'icon'} x="0px" y="0px" viewBox="0 0 485.213 485.212" >
                               <g>
                                   <path d="M60.652,75.816V15.163C60.652,6.781,67.433,0,75.817,0c8.38,0,15.161,6.781,15.161,15.163v60.653
                                c0,8.38-6.781,15.161-15.161,15.161C67.433,90.978,60.652,84.196,60.652,75.816z M318.424,90.978
                                c8.378,0,15.163-6.781,15.163-15.161V15.163C333.587,6.781,326.802,0,318.424,0c-8.382,0-15.168,6.781-15.168,15.163v60.653
                                C303.256,84.196,310.042,90.978,318.424,90.978z M485.212,363.906c0,66.996-54.312,121.307-121.303,121.307
                                c-66.986,0-121.302-54.311-121.302-121.307c0-66.986,54.315-121.3,121.302-121.3C430.9,242.606,485.212,296.919,485.212,363.906z
                                M454.89,363.906c0-50.161-40.81-90.976-90.98-90.976c-50.166,0-90.976,40.814-90.976,90.976c0,50.171,40.81,90.98,90.976,90.98
                                C414.08,454.886,454.89,414.077,454.89,363.906z M121.305,181.955H60.652v60.651h60.653V181.955z M60.652,333.584h60.653V272.93
                                H60.652V333.584z M151.629,242.606h60.654v-60.651h-60.654V242.606z M151.629,333.584h60.654V272.93h-60.654V333.584z
                                M30.328,360.891V151.628h333.582v60.653h30.327V94c0-18.421-14.692-33.349-32.843-33.349h-12.647v15.166
                                c0,16.701-13.596,30.325-30.322,30.325c-16.731,0-30.326-13.624-30.326-30.325V60.651H106.14v15.166
                                c0,16.701-13.593,30.325-30.322,30.325c-16.733,0-30.327-13.624-30.327-30.325V60.651H32.859C14.707,60.651,0.001,75.579,0.001,94
                                v266.892c0,18.36,14.706,33.346,32.858,33.346h179.424v-30.331H32.859C31.485,363.906,30.328,362.487,30.328,360.891z
                                M303.256,242.606v-60.651h-60.648v60.651H303.256z M409.399,363.906h-45.49v-45.49c0-8.377-6.781-15.158-15.163-15.158
                                s-15.159,6.781-15.159,15.158v60.658c0,8.378,6.777,15.163,15.159,15.163h60.653c8.382,0,15.163-6.785,15.163-15.163
                                C424.562,370.692,417.781,363.906,409.399,363.906z"/>
                               </g>
                           </svg>
                           {userInfo.createdData}
                       </p>
                       <p className='profile__text'>
                           <svg className={"mailIcon icon"} version="1.1" viewBox="0 0 64 64" >
                               <g id="Glyph_copy_2">
                                   <path d="M63.125,9.977c-0.902-1.321-2.419-2.194-4.131-2.194H5.006c-1.676,0-3.158,0.842-4.067,2.117l31.16,25.982L63.125,9.977z"/>
                                   <path d="M0.006,14.328v36.889c0,2.75,2.25,5,5,5h53.988c2.75,0,5-2.25,5-5V14.461L32.099,41.09L0.006,14.328z"/>
                               </g>
                           </svg>
                           {userInfo.personEmail}</p>
                   </div>
                   <div className='profile__center-side'>
                        <p className='profile__text'>Количество плейлистов: {countPlaylist}</p>
                        <p style={{margin: '13px 0 0 0'}} className='profile__text'>Количество отзывов: {countReview}</p>
                   </div>
                   <div className='profile__right-side'>
                       <div className='profile__checkbox-wrapper profile__text'>
                           {userInfo.personAge > 18 ? <button className={`profile__checkbox ${XXX ? 'active': ''}`} onClick={changeXXX}></button> : ''}
                           Отображать контент 18+?
                       </div>
                       <button className='profile__button'>Создать плейлист</button>
                   </div>
               </div>
                <div className='profile__main-content'>
                    <Playlist userId={userInfo.personId}></Playlist>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;