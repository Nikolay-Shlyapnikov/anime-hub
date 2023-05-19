import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import '../components/css/post.css';
import PostStatus from "../components/postStatus";
interface Post{
    id: number,
    createdAt: string,
    title: string,
    description: string,
    year: string,
    imagePath: string,
    videoPath:string,
    episodeCount:number,
    episodeDuration:string,
    userId: number,
    typeId: number,
    rating: number,
    genreId: number,
}

const PostPage = () =>{
    const location = useLocation();
    const postId = location.state;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(false);
    const getPost = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        try {
            const response = await fetch(`http://94.102.126.157:5000/post/${postId}`, requestOptions);
            const data:Post = await response.json();
            setPost(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getPost();
    }, []);
    return (
        <div>
            <Header/>
            <main className="post-page__container container">
                <PostStatus id={postId} user={user} imagePath={user.imagePath}/>
                <div className='right-side'></div>
            </main>
        </div>
    )
}

export default PostPage
