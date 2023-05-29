import React, {useContext, useEffect, useState} from "react";
import "../css/form.css";
import {useLocation, useNavigate} from "react-router-dom";
import {DomainContext} from "../../index";

interface UpdatePostFormState {
    title: string;
    description: string;
    year: number;
    image: string;
    // fileName: string;
    episodeCount: number;
    episodeDuration: number;
    typeId: number | null;
    genreId: number | null;
    isXXX: boolean;
}
interface genreInterface {
    genreId: number,
    genreName: string
}
interface typeInterface {
    typeId: number,
    typeName: string
}
const UpdatePostForm = () => {
    const domain = useContext(DomainContext);
    const location = useLocation();
    const postInfo = location.state.post;
    const [state, setState] = useState<UpdatePostFormState>({
        title:  postInfo.title,
        description:  postInfo.description,
        year: postInfo.year,
        image: postInfo.imagePath,
        episodeCount: postInfo.episodeCount,
        episodeDuration: postInfo.episodeDuration,
        // fileName:  postInfo.imagePath,
        typeId:  postInfo.typeId,
        genreId:  postInfo.genreId,
        isXXX:  postInfo.xxxPostContent
    });
    const [types, setTypes] = useState<typeInterface[]>([])
    const [genre, setGenre] = useState<genreInterface[]>([])
    const navigate = useNavigate();
    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, title: event.target.value }));
    };
    const descChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, description: event.target.value }));
    };

    const yearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, year: parseInt(event.target.value!) }));
    };
    const episodeCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, episodeCount: parseInt(event.target.value!) }));
    };
    const episodeDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, episodeDuration: parseInt(event.target.value!) }));
    };
    const typeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(parseInt(event.target.value!))
        setState((prevState) => ({ ...prevState, genreId: parseInt(event.target.value!) }));
    };
    const genreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(parseInt(event.target.value!))
        setState((prevState) => ({ ...prevState, genreId: parseInt(event.target.value!) }));
    };
    // const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files![0];
    //     const fileToBase64 = (file: File): Promise<string> => {
    //         return new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = () => {
    //                 const base64 = reader.result?.toString();
    //                 if (base64) {
    //                     resolve(base64.split(",")[1]); // Remove data:image/png;base64, from base64 string
    //                 } else {
    //                     reject("Ошибка загрузки фото, попробуйте ещё раз");
    //                 }
    //             };
    //         });
    //     }
    //     if (file) {
    //         fileToBase64(file).then(
    //             (fileInBase64) => {
    //                 setState((prevState) => ({
    //                     ...prevState,
    //                     image: fileInBase64,
    //                     fileName: file.name,
    //                 }));
    //             },
    //             (error) => {
    //                 setState((prevState) => ({ ...prevState, errorPhoto: error }));
    //             }
    //         );
    //     }
    //
    // }
    const changeXXX = () => {
        setState((prevState) => ({...prevState, isXXX: !state.isXXX}));
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: postInfo.id,
                title: state.title,
                description: state.description,
                year: String(state.year),
                image: state.image,
                episodeCount: state.episodeCount,
                episodeDuration: state.episodeDuration,
                userId: JSON.parse(localStorage.getItem('user')!).personId,
                typeId: state.typeId,
                xxxContent: state.isXXX,
                genreId: state.genreId,
            })
        }
        await fetch(`${domain}/updatePost`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success == 'true') {
                    navigate(`/post`, {state: postInfo.id});
                }
            });

    }

    const getFilters = async () =>{
        // setIsLoading(true);
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        try {
            const response = await fetch(`${domain}/filters`, requestOptions);
            const data = await response.json();
            setGenre(data.genreList);
            setTypes(data.typeList);
        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(false);
        }
    }
    useEffect(() => {
        getFilters();
    }, []);
    const genreOptions = genre.map((elem, index) =>{
        return <option key={'genre-'+index} selected={postInfo.genreId == elem.genreId} value={elem.genreId}>{elem.genreName}</option>
    })
    const typeOptions = types.map((elem, index) =>{
        return <option key={'types-'+index} selected={postInfo.typeId == elem.typeId} value={elem.typeId}>{elem.typeName}</option>
    })
    return (
        <section>
            <h1 className={"form__title"}>Создание нового поста</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <div className={'inner__wrapper'}>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите название:</p>
                        <input className={'input'} placeholder={'Название'}  type="text" value={state.title} onInput={titleChange} />
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите описание:</p>
                        <textarea className={'input textarea'} placeholder={'Описание'}   value={state.description} onInput={descChange}></textarea>
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите год выпуска:</p>
                        <input className={'input'} placeholder={'Год выпуска'}  type="number" value={state.year!} min={'1900'} max={'2023'} onInput={yearChange} />
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите количество эпизодов:</p>
                        <input className={'input'} placeholder={'Количество эпизодов'}  type="number" value={state.episodeCount!} min={'0'} onInput={episodeCountChange} />
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Введите длину эпизодов:</p>
                        <input className={'input'} placeholder={'Длина эпизодов'}  type="number" value={state.episodeDuration!} min={'0'} onInput={episodeDurationChange} />
                    </div>
                    {/*<div className={'input__wrapper'}>*/}
                    {/*    <p className={'input__title'}>Выберите фото поста:</p>*/}
                    {/*    <label className={'label__file button'}>*/}
                    {/*        Выбрать*/}
                    {/*        <input className={'input input__file'} accept="image/*" type="file" onInput={fileChange} />*/}
                    {/*    </label>*/}
                    {/*    <p className={'input__title'}>Имя файла: <span>{state.fileName}</span></p>*/}
                    {/*</div>*/}
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Укажите жанр:</p>
                        <select className={'select filter__select'} onChange={typeChange}>
                            {typeOptions}
                        </select>
                    </div>
                    <div className={'input__wrapper'}>
                        <p className={'input__title'}>Укажите тип:</p>
                        <select className={'select filter__select'} onChange={genreChange}>
                            {genreOptions}
                        </select>
                    </div>
                    <div className={'input__wrapper'}>
                        <div className='profile__checkbox-wrapper'>
                            <button type={'button'} className={`profile__checkbox ${state.isXXX ? 'active': ''}`} onClick={changeXXX}></button>
                            <p className={'input__title'}>Является контентом 18+?</p>
                        </div>
                    </div>
                    <button className={'button'} type="submit" >Отредактировать</button>
                </div>
            </form>
        </section>
    );
}
export default UpdatePostForm