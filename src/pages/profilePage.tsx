import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/header";
import '../components/css/style.css'
import '../components/css/null.css'
import '../components/css/profile.css'
import Comments from "../components/profilePageComponents/comments";
import Playlist from "../components/profilePageComponents/playlist";
import {Link, useLocation} from "react-router-dom";
import {DomainContext} from "../index";
interface profilePageInterface {
    XXX: boolean;
}
function ProfilePage() {
    const domain = useContext(DomainContext);
    const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const [XXX, setXXX] = useState<number>(userInfo.xxxContent ? 1 : 0);
    const [countPlaylist, setCountPlaylist] = useState(0);
    const [countReview, setCountReview] = useState(0);
    const [personAge, setPersonAge] = useState(0);
    const location = useLocation();
    let playListCreate;
    location.state ? playListCreate = location.state : playListCreate = false;
    const changeReviewCount = (value:number) => {
        setCountReview(value);
    };
    const changePlaylistCount = (value:number) => {
        setCountPlaylist(value);
    };
    const changeXXX = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId : userInfo.personId,
                xxxContent: XXX == 1 ? 0 : 1,
            })
        };
        try {
            const response = await fetch(`${domain}/updateXXX`, requestOptions);
            const data = await response.json();
            if(data.success == 'true'){
                setXXX(XXX == 1 ? 0 : 1)
                userInfo.xxxContent = !userInfo.xxxContent
                localStorage.setItem('user',JSON.stringify(userInfo))
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    };
    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    }
    useEffect(()=>{
        setPersonAge(calculateAge(userInfo.personAge));
    },[])
    return (
        <div>
            <Header/>
            <main className="profile__container container">
                <div className='profile__name-wrapper'>
                    <h1 className='profile__name'>{userInfo.personLogin}, {personAge}</h1>
                    {
                        userInfo.personRole == 4 && <Link className='profile__button profile__button--top' to={'/admin'}>Панель администратора</Link>
                    }
                    {
                        userInfo.personRole == 3 && <Link className='profile__button profile__button--top' to={'/admin'}>Панель модератора</Link>
                    }
                    {
                        userInfo.personRole == 4 || userInfo.personRole == 3 ? <Link className='profile__button profile__button--top' to={'/postForm'}>Создать новый пост</Link>: null
                    }
                </div>
               <div className='user__info-wrapper'>
                   <div className='profile__left-side'>
                       <img className='profile__avatar' src={userInfo.personAvatar} alt='Фото профиля'/>
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
                           {personAge > 18 ? <div className='profile__checkbox-wrapper profile__text'><button className={`profile__checkbox ${XXX ? 'active': ''}`} onClick={changeXXX}></button> Отображать контент 18+?</div> : ''}
                       <Link to={'/playlistForm'}className='profile__button'>Создать плейлист</Link>
                       {
                           playListCreate ? <p className={'profile__text green'}>Вы создали плейлист</p>: null
                       }

                   </div>
               </div>
                <div className='profile__main-content'>
                    <Playlist setPlaylistCount={changePlaylistCount} userId={userInfo.personId}></Playlist>
                    <Comments setReviewCount={changeReviewCount} userId={userInfo.personId}></Comments>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;