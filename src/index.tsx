import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import PostPage from "./pages/postPage";
import PostFormPage from "./pages/addProfilePage";
import PlayListFormPage from "./pages/playListFormPage";
import AdminPanelPage from "./pages/adminPanelPage";
import UpdatePostPage from "./pages/updatePostPage";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
export const DomainContext = React.createContext('');

root.render(
    <DomainContext.Provider value="http://94.102.126.157:5000">
        <Router>
            <Routes>
                <Route key={"route1"} path="/" element={<MainPage/>} />
                <Route key={"route2"} path="/login" element={<LoginPage />} />
                <Route key={"route3"} path="/signup" element={<SignupPage />} />
                <Route key={"route4"} path="/profile" element={<ProfilePage />} />
                <Route key={"route5"} path="/post" element={<PostPage />} />
                <Route key={"route6"} path="/postForm" element={<PostFormPage />} />
                <Route key={"route7"} path="/playlistForm" element={<PlayListFormPage />} />
                <Route key={"route8"} path="/admin" element={<AdminPanelPage />} />
                <Route key={"route9"} path="/updatePost" element={<UpdatePostPage />} />
            </Routes>
        </Router>
    </DomainContext.Provider>
);

reportWebVitals();
