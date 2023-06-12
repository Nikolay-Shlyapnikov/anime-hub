import React, { useEffect } from 'react'
import '../css/post.css';
import {responseInterface} from "../../pages/postPage";

interface propsInterface {
    postInfo: responseInterface;

}
const PostInfo = (props:propsInterface) => {
    const post= props.postInfo.Post;
    return (
        <div className={'post-info__wrapper'}>
            <div className="post__middle-side">
                <p className={'post__rating post-info__text'}><span>{post.rating}</span>/10</p>
                <p className={'post__count-reviews post-info__text number'}><span>Количество оценок: </span>{post.countLike}</p>
                <p className={'post__title post-info__text number'}>{post.title}</p>
                <p className={'post__type post-info__text number'}><span>Тип:</span> {post.typeName}</p>
                <p className={'post__genre post-info__text number'}><span>Жанр:</span> {post.genreName}</p>
                <p className={'post__episode-count post-info__text number'}><span>Количество эпизодов:</span> {post.episodeCount}</p>
                <p className={'post__episode-duration post-info__text number'}><span>Длина эпизода:</span> {post.episodeDuration}</p>
                <p className={'post__year post-info__text number'}><span>Год:</span> {post.year}</p>
                <p className={'post__forbidden post-info__text number'}><span>Возрастные ограничения:</span> {post.xxxPostContent ? '18+': 'Отсутствуют'}</p>
            </div>

        </div>

    )
}
export default PostInfo