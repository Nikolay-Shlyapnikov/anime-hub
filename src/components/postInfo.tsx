import React, { useEffect } from 'react'
import '../components/css/post.css';
import {responseInterface} from "../pages/postPage";

interface propsInterface {
    postInfo: responseInterface;
}
const PostInfo = (props:propsInterface) => {
    const post= props.postInfo.Post;
    const comments = props.postInfo.Comments
    useEffect(()=>{

    }, [])
    return (
        <div className="post__middle-side">
            <p className={'post__rating post-info__text'}><span>{post.rating}</span>/10</p>
            <p className={'post__count-reviews post-info__text number'}><span>Количество отзывов: </span>{comments.length}</p>
            <p className={'post__title post-info__text number'}>{post.title}</p>
            <p className={'post__type post-info__text number'}><span>Тип:</span> {post.typeId}</p>
            <p className={'post__episode-count post-info__text number'}><span>Количество эпизодов:</span> {post.episodeCount}</p>
            <p className={'post__episode-duration post-info__text number'}><span>Длина эпизода:</span> {post.episodeDuration}</p>
            <p className={'post__genre post-info__text number'}><span>Жанр:</span> {post.genreId}</p>
            <p className={'post__year post-info__text number'}><span>Год:</span> {post.year}</p>
            <p className={'post__forbidden post-info__text number'}><span>Возрастные ограничения:</span> {post.xxxPostContent ? '18+': 'Отсутствуют'}</p>

        </div>
    )
}
export default PostInfo