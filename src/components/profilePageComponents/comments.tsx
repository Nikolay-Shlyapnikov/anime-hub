import React, { useContext, useEffect, useState} from 'react';
import '../css/comments.css'
import {DomainContext} from "../../index";
import {useNavigate} from "react-router-dom";
interface commentstInterface{
    userId: number;
    setReviewCount:Function;
}
interface comment{
    commentId: number
    createdAt: string
    imagePath: string
    postId: number
    text: string
    userId: number
    userLogin: number
    title: string
}
const Comments = (props:commentstInterface) =>{
    const domain = useContext(DomainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<comment[] | string>('Вы пока не оставляли комментариев');
    const [commentsContent, setCommentsContent] = useState<React.JSX.Element[] | React.JSX.Element>([]);;
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
            data.length > 0 ? setComments(data) : setComments('Вы пока не оставляли комментариев')
            props.setReviewCount(data.length);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const getCommentContent = () =>{
        let commentContents: JSX.Element[] = [];

        if (typeof comments === 'string') {
            commentContents = [<div key={0} className="profile__comment-empty">{comments}</div>];
        } else if (Array.isArray(comments)) {
            commentContents = (comments as comment[]).map((comment, index) => (
                <div key={index} className="profile__comment-item">
                    <div className={'profile__comment-text'}>Текст комментария: {comment.text}</div>
                    <div className="profile__comment-post">К посту: <span data-id={comment.postId} onClick={linkToPost} className={'profile__comment-post-title'}>{comment.title}</span>
                    </div>
                </div>
            ));
        }
        setCommentsContent(commentContents);
    }
    useEffect(()=>{
        getCommentContent();
    }, [setComments, comments]);
    useEffect(()=>{
        getComments();
    }, []);
    return(
        <div className=''>
            <p className='playlists__title'>Ваши комментарии</p>
            <div className={'profile__comments'}>
                {commentsContent}
            </div>

        </div>
    )
}

export default Comments;