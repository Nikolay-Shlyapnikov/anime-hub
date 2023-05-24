import React, {useContext, useEffect, useState, } from 'react'
import { useLocation , useNavigate} from "react-router-dom";
import Header from "../components/header";
import '../components/css/post.css';
import PostStatus from "../components/postStatus";

import {DomainContext} from "../index";
import PostInfo from "../components/postInfo";
import PostComments from "../components/postComments";
export interface PostInterface{
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
    typeName: string,
    genreName: string,
    rating: number,
    genreId: number,
    xxxPostContent: number,
    countLike: number
}
interface CommentInterface{
    commentId: number,
    createdAt: string,
    text: string,
    userId: number,
    userLogin: string,
    imagePath:string
}
export interface responseInterface {
    Post: PostInterface;
    Comments: CommentInterface[];
}

const PostPage = () =>{
    const location = useLocation();
    const domain = useContext(DomainContext);
    const navigate = useNavigate();
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
            typeName: '',
            genreName: '',
            videoPath:'',
            episodeCount:0,
            episodeDuration:0,
            userId: 0,
            typeId: 0,
            rating: 0,
            genreId: 0,
            xxxPostContent: 0,
            countLike: 0
        },Comments:[]});
    const [isLoading, setIsLoading] = useState(false);
    const [comment, setComment] = useState('');

    const getPost = async () => {
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
    const ratingChange =  async (event: React.ChangeEvent<HTMLSelectElement>) =>{
            if(user == null){
                navigate('/login');
            }
            else{
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        personId: user.personId,
                        postId: postId,
                        rating: parseInt(event.target.value)
                    })
                };
                try {
                    const response = await fetch(`${domain}/setRating`, requestOptions);
                    const data = await response.json();
                    if(data.success == 'true'){
                        getPost();
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
    }

    const textChange =(event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setComment(event.target.value);
    }

    const submitComment = async (e:React.FormEvent) =>{
        e.preventDefault();
        if(user == null){
            navigate('/login');
        }
        else{
            setIsLoading(true);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.personId,
                    text: comment,
                    postId: postId
                })
            };
            try {
                const response = await fetch(`${domain}/commentAdd`, requestOptions);
                const data = await response.json();
                if(data.success == 'true'){
                    getPost();
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }
    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <Header/>
            <main className="post-page__container container">
                <PostStatus onChangeRating={ratingChange} id={postId} user={user} imagePath={post.Post.imagePath}/>
                <PostInfo postInfo={post}></PostInfo>
                <p className={'post__description'}>{post.Post.description}</p>
                <PostComments  submit={submitComment} textChange={textChange} postInfo={post!}></PostComments>
            </main>
        </div>
    )
}

export default PostPage
