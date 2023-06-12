import React, {useContext} from 'react'
import '../css/post.css';
import {responseInterface} from "../../pages/postPage";
import CommentsForm from "../forms/comment";
import {Link, useNavigate} from "react-router-dom";
import {DomainContext} from "../../index";
interface propsInterface {
    postInfo: responseInterface;
    submit:React.FormEventHandler<HTMLFormElement>
    textChange: React.ChangeEventHandler<HTMLTextAreaElement>
    deleteComment: React.MouseEventHandler<HTMLButtonElement>
}

const PostComments = (props:propsInterface) => {
    const post= props.postInfo.Post;
    const comments = props.postInfo.Comments;
    const domain = useContext(DomainContext);
    const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const navigate = useNavigate();
    const addReport = async (e:React.MouseEvent<HTMLElement>)=>{
        if(userInfo == null){
            navigate('/login');
        }
        else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    commentId: e.currentTarget.dataset.comment_id,
                    postId: e.currentTarget.dataset.post_id
                })
            };
            try {
                const response = await fetch(`${domain}/addReport`, requestOptions);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {

            }
        }
    }

    const commentsContent = comments.map((comment)=>{
        return(
            <div key={comment.commentId} className="comment__item">
                <div className={'comment__wrapper'}>
                    <div className="comment__info">
                        <img className="comment__author-image" src={comment.imagePath} alt="Аватар автора"/>
                        <Link to={`/profile/${comment.userId}`} className="comment__author-name">{comment.userLogin}</Link>
                        <span className="comment__date">{comment.createdAt}</span>
                    </div>
                    <p className="comment__text">{comment.text}</p>
                </div>
                <div className={'comment__button'}>
                    <button className={'profile__button profile__button--top'} data-post_id={comment.postId} data-comment_id={comment.commentId} onClick={addReport}>
                        Пожаловаться
                    </button>
                    {userInfo != null && (comment.userId == userInfo.personId || userInfo.personRole == 3 || userInfo.personRole == 4) ?
                        <button className={'profile__button profile__button--top'} data-post_id={comment.postId} data-comment_id={comment.commentId} onClick={props.deleteComment}>
                            Удалить
                        </button>: null}
                </div>
            </div>
        )});

    return (
        <div className="post__comments">
            <CommentsForm textChange={props.textChange} submit={props.submit} id={post.id}></CommentsForm>
            {comments.length > 0 && <p className={'comment__title'}>Комментарии:</p>}
            {commentsContent}
        </div>
    )
}
export default PostComments