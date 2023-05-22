import React from 'react'
import '../css/post.css';
interface propsInterface {
    id: number,
    submit:React.FormEventHandler<HTMLFormElement>
    textChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const CommentsForm = (props:propsInterface) => {

    return (
        <form onSubmit={props.submit} className="post__comments-form">
            <textarea className={'comment__textarea'} onChange={props.textChange} placeholder={'Введите текст комментария'}></textarea>
            <button className={'button'}>Отправить</button>
        </form>
    )
}
export default CommentsForm