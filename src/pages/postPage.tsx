import React, {useContext, useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import Header from "../components/header";
import '../components/css/post.css';
import PostStatus from "../components/postStatus";

import {DomainContext} from "../index";
import PostInfo from "../components/postInfo";
import PostComments from "../components/postComments";
 interface PostInterface{
    id: number,
    createdAt: string,
    title: string,
    description: string,
    year: string,
    imagePath: string,
    videoPath:string,
    episodeCount:number,
    episodeDuration:number,
    userId: number,
    typeId: number,
    rating: number,
    genreId: number,
    xxxPostContent: number
}
interface CommentInterface{
    commentId: number,
    createdAt: string,
    text: string,
    userId: number,
    userLogin: string,
}
export interface responseInterface {
    Post: PostInterface;
    Comments: CommentInterface[];
}

const PostPage = () =>{
    const location = useLocation();
    const domain = useContext(DomainContext);
    const postId = location.state;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const [post, setPost] = useState<responseInterface>( {
        Post:{
            id: postId,
            createdAt: '',
            title: '',
            description: '',
            year: '',
            imagePath: '',
            videoPath:'',
            episodeCount:0,
            episodeDuration:0,
            userId: 0,
            typeId: 0,
            rating: 0,
            genreId: 0,
            xxxPostContent: 0
        },Comments:[]});
    const [isLoading, setIsLoading] = useState(false);
    const getPost = async () => {
        console.log('Запрос запускается');

        setIsLoading(true);
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        try {
            const response = await fetch(`${domain}/post/${postId}`, requestOptions);
            const data:responseInterface = await response.json();
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
                <PostInfo postInfo={post}></PostInfo>
                <p className={'post__description'}>{post.Post.description}</p>
                <PostComments postInfo={post!}></PostComments>
            </main>
        </div>
    )
}

export default PostPage
