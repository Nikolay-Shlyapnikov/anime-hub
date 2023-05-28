import React, {useContext, useEffect, useState} from 'react';
import './css/comments.css'
import {DomainContext} from "../index";
import {useNavigate} from "react-router-dom";
import {PlaylistInterface} from "./postStatus";
interface commentstInterface{
    userId: number;
}

const Comments = (props:commentstInterface) =>{
    const domain = useContext(DomainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState();
    const navigate = useNavigate();

    const linkToPost = (e: React.MouseEvent<HTMLElement>) =>{
        navigate('/post', {state: parseInt(e.currentTarget.dataset.id!)});
    }
    const getComments = async () =>{
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: props.userId
            })
        };
        try {
            const response = await fetch(`${domain}/getPersonComment`, requestOptions);
            const data = await response.json();
            console.log(data);
            setComments(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getComments();
    }, [])
    return(
        <div className=''>
            <p className='playlists__title'>Ваши комментарии</p>
            <div className={'comments'}>
            </div>
        </div>
    )
}

export default Comments;