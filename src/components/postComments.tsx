import React, {useContext, useEffect, useState} from 'react'
import '../components/css/post.css';
import {DomainContext} from "../index";
import {responseInterface} from "../pages/postPage";
import CommentsForm from "./forms/comment";
import {Link} from "react-router-dom";

interface propsInterface {
    postInfo: responseInterface;
}
const PostComments = (props:propsInterface) => {
    const [isLoading, setIsLoading] = useState(false);
    const post= props.postInfo.Post;
    const comments = props.postInfo.Comments
    const domain = useContext(DomainContext);

    const commentsContent = comments.map((comment, index)=>{
        return(
            <div key={comment.commentId} className="comment__item">
                <div className="comment__info">
                    <img className="comment__author-image" src={comment.imagePath} alt="Аватар автора"/>
                        <Link to={`/profile/${comment.userId}`} className="comment__author-name">{comment.userLogin}</Link>
                        <span className="comment__date">{comment.createdAt}</span>
                        {/*<span>{comment.rating}</span>*/}
                </div>
                <p className="comment__text">{comment.text}</p>
            </div>
        )
    });
    return (
        <div className="post__comments">
            <CommentsForm id={post.id}></CommentsForm>
            <p className={'comment__title'}>Комментарии:</p>
            {commentsContent}
        </div>
    )
}
export default PostComments