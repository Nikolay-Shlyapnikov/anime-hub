import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Router>
        <Routes>
            <Route key={"route1"} path="/" element={<MainPage/>} />
            <Route key={"route2"} path="/login" element={<LoginPage />} />
            <Route key={"route3"} path="/signup" element={<SignupPage />} />
        </Routes>
    </Router>
);

reportWebVitals();
