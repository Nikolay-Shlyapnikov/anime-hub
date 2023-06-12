import React, {useContext, useState} from "react";
import "../css/form.css";
import { Link, useNavigate } from "react-router-dom";
import {DomainContext} from "../../index";
interface registrationFormState {
    login: string;
    password: string;
    passwordRepeat: string;
    file: string | null;
    age: string;
    email: string;
    fileName: string;
    errorLogin: Array<string>;
    errorPassword: Array<string>;
    errorEmail: Array<string>;
    errorPhoto: Array<string>;
}

const RegistrationForm = () => {
    const [state, setState] = useState<registrationFormState>({
        login: "",
        password: "",
        passwordRepeat: "",
        file: null,
        age: "",
        email: "",
        fileName: "не выбран",
        errorLogin: [],
        errorPassword: [],
        errorEmail: [],
        errorPhoto: [],
    });
    const navigate = useNavigate();
    const domain = useContext(DomainContext);
    const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, login: event.target.value }));
    };
    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, email: event.target.value }));
    };
    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(
            (prevState) => ({ ...prevState, password: event.target.value }));
    };
    const passwordRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            passwordRepeat: event.target.value,
        }));
    };
    const ageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const age = event.target.value;
        setState((prevState) => ({ ...prevState, age }));
    };
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const fileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const base64 = reader.result?.toString();
                    if (base64) {
                        resolve(base64.split(",")[1]); // Remove data:image/png;base64, from base64 string
                    } else {
                        reject("Ошибка загрузки фото, попробуйте ещё раз");
                    }
                };
            });
        }
        if (file) {
            fileToBase64(file).then(
                (fileInBase64) => {
                    setState((prevState) => ({
                        ...prevState,
                        file: fileInBase64,
                        fileName: file.name,
                    }));
                },
                (error) => {
                    setState((prevState) => ({ ...prevState, errorPhoto: error }));
                }
            );
        }

    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                login: state.login,
                password: state.password,
                passwordRepeat: state.passwordRepeat,
                photo: state.file,
                age: state.age,
                email: state.email,
            })
        }
        console.log(requestOptions.body);
        await fetch(`${domain}/signup`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.registrationError == '') {
                    navigate('/login', { state: { registration: true } });
                }
                setState(prevState => {
                    return {
                        ...prevState,
                        errorLogin: [data.loginError, data.registrationLoginError],
                        errorPassword: data.passwordError,
                        errorEmail: [data.mailError, data.registrationMailError],
                    };
                });
            });

    }

        return (
            <section>
                <h1 className={"form__title"}>Регистрация</h1>
                <form className={'form'} onSubmit={handleSubmit}>
                    <div className={'inner__wrapper'}>
                        <div className={'input__wrapper'}>
                            <p className={'input__title'}>Введите логин:</p>
                            <input className={'input'} placeholder={'Ivanov'}  type="text" value={state.login} onInput={loginChange} />
                            {
                                state.errorLogin.length ?
                                    state.errorLogin.map((error, index) => (
                                        <p key={'loginError'+index}  className={'input__error'}>{error}</p>
                                    )): null
                            }
                        </div>
                        <div className={'input__wrapper'}>
                            <p className={'input__title'}>Введите пароль:</p>
                            <input className={'input'} placeholder={'qwerty'} type="text" value={state.password} onInput={passwordChange} />
                            {
                                state.errorPassword.length ?
                                    state.errorPassword.map((error, index) =>
                                        (<p key={'passwordError'+index}  className={'input__error'}>{error}</p>
                            )) : null
                            }
                        </div>
                        <div className={'input__wrapper'}>
                            <p className={'input__title'}>Потворите пароль:</p>
                            <input className={'input'} placeholder={'qwerty'}  type="text" value={state.passwordRepeat} onInput={passwordRepeatChange} />
                        </div>
                        <div className={'input__wrapper'}>
                            <p className={'input__title'}>Выберите фото профиля:</p>
                            <label className={'label__file button'}>
                                Выбрать
                                <input className={'input input__file'} accept="image/*" type="file" onInput={fileChange} />
                            </label>
                            <p className={'input__title'}>Имя файла: <span>{state.fileName}</span></p>
                            {
                                state.errorPhoto.length ?
                                    state.errorPhoto.map((error, index) =>
                                        (<p key={'errorPhoto'+index}  className={'input__error'}>{error}</p>
                                )) : null
                            }
                        </div>
                        <div className={'input__wrapper'}>
                            <p className={'input__title'}>Укажите возраст:</p>
                            <input className={'input'} placeholder={'2002-01-01'}  min="1923-01-01"  max={new Date().toISOString().split("T")[0]} type="date" value={state.age} onChange={ageChange} />
                        </div>
                        <div className={'input__wrapper'}>
                            <p className={'input__title'}>Введите email:</p>
                            <input className={'input'} placeholder={'example@mail.ru'}  type="text" value={state.email} onInput={emailChange} />
                            {
                                state.errorEmail.length ?
                                    state.errorEmail.map((error, index) =>
                                        (<p key={'emailError'+index}  className={'input__error'}>{error}</p>
                                )) : null
                            }
                        </div>
                        <button className={'button'} type="submit" >Зарегистрироваться</button>
                        <p className={'input__title lower__link'}>Уже есть аккаунт? <Link style={ {display: "block"} } id='link' key={"link"} to={{ pathname: "/Login"}}>Войдите!</Link></p>
                    </div>
                </form>
        </section>
        );
}
export default RegistrationForm