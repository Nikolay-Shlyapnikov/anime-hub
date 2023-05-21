import React, {useContext, useState} from "react";
import "../css/form.css";
import { useNavigate } from "react-router-dom";
import {DomainContext} from "../../index";

interface playListFormState {
    title: string;
    isPrivate: number;
}
const PlayListForm = () => {
    const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const domain = useContext(DomainContext);
    const [state, setState] = useState<playListFormState>({
        title: "",
        isPrivate: 0
    });
    const navigate = useNavigate();
    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, title: event.target.value }));
    };
    const changePrivate = () => {
        let privateValue = state.isPrivate == 1 ? 0 : 1;
        setState((prevState) => ({ ...prevState, isPrivate: privateValue}));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: userInfo.personId,
                title: state.title,
                isPrivate: state.isPrivate,
            })
        }
        console.log(requestOptions.body);
        await fetch(`${domain}/addPlaylist`, requestOptions)
            .then(response => response.json())
            .then((data) => {
               if(data.success === 'true') navigate('/profile', {state: {createPlaylist: true}});
            });

    }

    return (
        <section>
            <h1 className={"form__title"}>Создание нового плейлиста</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <div className={'inner__wrapper'}>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите название:</p>
                        <input className={'input'} placeholder={'Название плейлиста'}  type="text" value={state.title} onInput={titleChange} />
                    </div>
                    <div className={'input__wrapper'}>
                        <div className='profile__checkbox-wrapper profile__text'>
                            <button type={'button'} className={`profile__checkbox ${state.isPrivate == 1 ? 'active': ''}`} onClick={changePrivate}></button>
                            <p className={'input__title'}> Приватный плейлист?</p>
                        </div>
                    </div>
                    <button className={'button'} type="submit" >Создать плейлист</button>
                </div>
            </form>
        </section>
    );
}
export default PlayListForm