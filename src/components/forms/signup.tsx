import React, { useState } from "react";
import "../css/form.css";
import { Link, useNavigate } from "react-router-dom";

interface registrationFormState {
    login: string;
    password: string;
    passwordRepeat: string;
    file: string | null;
    age: number | null;
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
        age: null,
        email: "",
        fileName: "не выбран",
        errorLogin: [],
        errorPassword: [],
        errorEmail: [],
        errorPhoto: [],
    });
    const navigate = useNavigate();

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
    const ageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const age = parseInt(event.target.value);
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
        await fetch('http://10.0.0.65:5000/signup', requestOptions)
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

        const options = Array.from({ length: 94 }, (_, i) => <option key={i}>{i+7}</option>);
        return (
            <section>
                <h1 className={"title"}>Регистрация</h1>
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
                            <select className={'select'} onChange={ageChange}>{options}</select>
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