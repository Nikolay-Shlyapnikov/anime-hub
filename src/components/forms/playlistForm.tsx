import React, { useState } from "react";
import "../css/form.css";
import { useNavigate } from "react-router-dom";

interface registrationFormState {
    title: string;
    description: string;
    year: string;
    image: string | null;
    fileName: string;
    episodeCount: number | null;
    episodeDuration: number | null;
    typeId: number | null;
    genreId: number | null;
    isXXX: boolean;
}

const RegistrationForm = () => {
    const [state, setState] = useState<registrationFormState>({
        title: "",
        description: "",
        year: "",
        image: null,
        episodeCount: null,
        episodeDuration: null,
        fileName: "не выбран",
        typeId: null,
        genreId: null,
        isXXX: false
    });
    const navigate = useNavigate();
    const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, login: event.target.value }));
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
                title: "",
                description: "",
                year: "",
                image: null,
                episodeCount: null,
                episodeDuration: null,
                fileName: "не выбран",
                typeId: null,
                genreId: null,
                isXXX: false
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

    const options = Array.from({ length: 94 }, (_, i) => <option key={i}>{i}</option>);
    return (
        <section>
            <h1 className={"title"}>Создание нового поста</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <div className={'inner__wrapper'}>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите название:</p>
                        <input className={'input'} placeholder={'Ivanov'}  type="text" value={state.title} onInput={loginChange} />
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Выберите фото профиля:</p>
                        <label className={'label__file button'}>
                            Выбрать
                            <input className={'input input__file'} accept="image/*" type="file" onInput={fileChange} />
                        </label>
                        <p className={'input__title'}>Имя файла: <span>{state.fileName}</span></p>
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Укажите возраст:</p>
                        <select className={'select'} onChange={ageChange}>{options}</select>
                    </div>
                    <button className={'button'} type="submit" >Создать пост</button>
                </div>
            </form>
        </section>
    );
}
export default RegistrationForm