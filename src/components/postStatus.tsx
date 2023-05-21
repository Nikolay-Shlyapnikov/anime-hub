import React, {useContext, useEffect, useState} from 'react'
import {userInfoInterface} from "./forms/login";
import * as domain from "domain";
import '../components/css/post.css';
import {DomainContext} from "../index";
export interface PlaylistInterface {
    id:number
    createdAt: string
    title: string
}

interface propsInterface {
    id:number
    user: userInfoInterface
    imagePath: string
}
const PostStatus = (props:propsInterface) => {
    const [isLoading, setIsLoading] = useState(false);
    const [playlists, setPlaylists] = useState<PlaylistInterface[]>();
    const [playlistContent, setPlaylistContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const domain = useContext(DomainContext);
    const selectStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = parseInt(event.target.value);
        setIsLoading(true);
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        await fetch(`${domain}/setStatus?postId=${props.id}&statusId=${status}`, requestOptions);
        // try {
        //     const response = await fetch(`http://10.0.0.65:5000/setStatus?postId=${postId}&statusId=${status}`, requestOptions);
        //     const data:Post = await response.json();
        //     setStatus(data);
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setIsLoading(false);
        // }
    }
    const showPlaylists = async ()=>{
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: props.user.personId
            })
        };
        try {
            const response = await fetch(`${domain}/playlists`, requestOptions);
            const data:PlaylistInterface[] = await response.json();
            setPlaylists(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        if((playlists ?? []).length === 0){
            setPlaylistContent(<p className='playlist__item'>У вас ещё нет плейлистов</p>);
        }
        if((playlists ?? []).length > 0){
            const content = (playlists as PlaylistInterface[]).map((playlist, index) => {
                return (
                    <p onClick={addPostToPlaylist} data-id={playlist.id} className='playlist__item' key={'playlist'+index}>
                        <span>{playlist.title}</span>
                        <button type={'button'} className={`profile__checkbox active`}></button>
                        {/*<p className={'input__title'}> Приватный плейлист?</p>*/}
                    </p>
                )
            });
            setPlaylistContent(content);
        }
        if(playlists == null){
            setPlaylistContent(<p></p>);
        }
    }, [playlists]);
    useEffect(()=>{
        showPlaylists();
    }, [])
    const addPostToPlaylist = async (event: React.MouseEvent<HTMLParagraphElement>) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.id,
                playlistId: event.currentTarget.dataset.id,
            })
        };
        try {
            const response = await fetch(`${domain}/playlists`, requestOptions);
            const data:PlaylistInterface[] = await response.json();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={'sidebar'}>
            <div className="post__left-side">
                <img className='post__image' alt='Фото аниму' src={props.imagePath}/>
                <div className='status__wrapper'>
                    <p className='status__title'>Статус:</p>
                    <select className='status__select select' onSelect={selectStatus}>
                        <option className='status__option' value='1'>Планирую посмотреть</option>
                        <option className='status__option' value='2'>Смотрю</option>
                        <option className='status__option' value='3'>Просмотрено</option>
                    </select>
                </div>
                <div className='post__playlists'>
                    <p className='playlist__title'>Добавить в плейлист</p>
                    <div className={playlistContent ? 'playlist__wrapper active' : 'playlist__wrapper'}>
                        {playlistContent}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostStatus