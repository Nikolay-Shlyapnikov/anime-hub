import React from 'react';
import PostForm from "../components/forms/postForm";
import Header from "../components/header";
function PostFormPage() {
    return (
        <div className="loginPage">
            <Header/>
            <PostForm></PostForm>
        </div>
    );
}
export default PostFormPage;