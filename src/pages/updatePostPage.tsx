import React from 'react';
import UpdatePostForm from "../components/forms/updatePost";
import Header from "../components/header";
function SignupPage() {
    return (
        <div className="updatePost">
            <Header/>
            <UpdatePostForm/>
        </div>
    );
}
export default SignupPage;