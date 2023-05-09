import React, { useState} from "react";
import '../css/form.css';
import {Link, useLocation, useNavigate } from "react-router-dom";

interface LoginFormState {
    login: string;
    password: string;
    errorAuth: string;
}

const LoginForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorAuth, setErrorAuth] = useState<string>('');
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
        fetch('http://10.0.0.65:5000/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                data.authError ? setErrorAuth(data.authError) :  navigate('/profile', {state: data});
            });
    }

    return (
        <section>
            {
                registration ? <h2 className={'title green'}> Вы успешно зарегистрировались</h2>: null
            }
            <h1 className={"title"}>Вход</h1>
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