import React, {useContext, useState} from "react";
import '../css/form.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as domain from "domain";
import {DomainContext} from "../../index";
export interface userInfoInterface {
    createdData: string
    personAge: number
    personAvatar: string
    personEmail: string
    personId: number
    personLogin: string
    personRole: number
    xxxContent: number
}
const LoginForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorAuth, setErrorAuth] = useState<string>('');
    const domain = useContext(DomainContext);
    const location = useLocation();
    const navigate = useNavigate();
    let registration;
    location.state ? registration = location.state : registration = false;
    const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const setUser = (data:userInfoInterface) =>{
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/profile');
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: login,
                password: password,
            })
        };
        fetch(`${domain}/login`, requestOptions)
            .then(response => response.json())
            .then(data => {
                data.authError ? setErrorAuth(data.authError) : setUser(data);
            });
    }

    return (
        <section>
            {
                registration ? <h2 className={'form__title green'}> Вы успешно зарегистрировались</h2>: null
            }
            <h1 className={"form__title"}>Вход</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <div className={'inner__wrapper'}>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите логин:</p>
                        <input className={'input'} placeholder={'Ivanov'}  type="text" value={login} onInput={loginChange} />
                        {
                            errorAuth && errorAuth === 'Пользователь с таким логином не зарегистрирован' ? <p className={'input__error'}>{errorAuth}</p> : null
                        }
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите пароль:</p>
                        <input className={'input'} placeholder={'qwerty'} type="text" value={password} onInput={passwordChange} />
                        {
                            errorAuth && errorAuth === 'Пароль не верный' ? <p className={'input__error'}>{errorAuth}</p> : null
                        }
                    </div>
                    <button className={'button'} type="submit" >Войти</button>
                    {
                        registration ? '' : <p className={'input__title lower__link'}>Ещё нет аккаунта? <Link style={ {display: "block"} } id='link' key={"link"} to={{pathname:'/signup' }}>Зарегистрируйтесь!</Link></p>
                    }

                    </div>
                </form>
            </section>
        );
}
export default LoginForm