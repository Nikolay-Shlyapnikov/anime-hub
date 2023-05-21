import React, {useContext, useEffect, useState} from 'react'
import '../css/post.css';
import {DomainContext} from "../../index";
interface propsInterface {
    id: number,
}
interface commentInterface{
    text: string,
    rating: number,
}
const CommentsForm = (props:propsInterface) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comment, setComment] = useState({text: '', rating: 0});
    const userId = JSON.parse(localStorage.getItem('user')!).personId
    const domain = useContext(DomainContext);
    const textChange =(event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setComment((prevState) => ({ ...prevState, text: event.target.value }));
    }

    const ratingChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setComment((prevState) => ({ ...prevState, rating: parseInt(event.target.value) }));
    }
    const submitComment = async (e:React.FormEvent) =>{
        e.preventDefault();
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userId,
                text: comment.text,
                rating: comment.rating,
                postId: props.id
            })
        };
        try {
            const response = await fetch(`${domain}/commentAdd`, requestOptions);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{

    }, []);
    let options = Array.from({ length: 11 }, (_, i) => <option key={i} value={i}>{i}</option>);
    return (
        <form onSubmit={submitComment} className="post__comments-form">
            <div className={'select__wrapper'}>
                <p className={'select__title'}>Укажите рейтинг: </p>
                <select onChange={ratingChange} className={'select'}>
                    {options}
                </select>
            </div>

            <textarea className={'comment__textarea'} onChange={textChange} placeholder={'Введите текст комментария'}></textarea>
            <button className={'button'}>Отправить</button>
        </form>
    )
}
export default CommentsForm