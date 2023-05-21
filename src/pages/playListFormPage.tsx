import React from 'react';
import PlaylistForm from "../components/forms/playlistForm";
import Header from "../components/header";
function SignupPage() {
    return (
        <div className="loginPage">
            <Header/>
            <PlaylistForm/>
        </div>
    );
}
export default SignupPage;