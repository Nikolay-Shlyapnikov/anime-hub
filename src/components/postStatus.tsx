import React, {useEffect, useState} from 'react'
import {userInfoInterface} from "./forms/login";
interface Playlist {
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
    const [status, setStatus] = useState();
    const [playlists, setPlaylists] = useState<Playlist[]>();
    const [playlistContent, setPlaylistContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const selectStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = parseInt(event.target.value);
        setIsLoading(true);
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        await fetch(`http://10.0.0.65:5000/setStatus?postId=${props.id}&statusId=${status}`, requestOptions);
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
            const response = await fetch(`http://10.0.0.65:5000/playlists`, requestOptions);
            const data:Playlist[] = await response.json();
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
            const content = (playlists as Playlist[]).map((playlist, index) => {
                return (
                    <p onClick={addPostToPlaylist} data-id={playlist.id} className='playlist__item' key={'playlist'+index}>{playlist.title}</p>
                )
            });
            setPlaylistContent(content);
        }
        if(playlists == null){
            setPlaylistContent(<p></p>);
        }
    }, [playlists])
    const addPostToPlaylist = async (event: React.MouseEvent<HTMLParagraphElement>) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.id,
                playlistId: event.currentTarget.dataset.id,
                userId: props.user.personId
            })
        };
        try {
            const response = await fetch(`http://10.0.0.65:5000/playlists`, requestOptions);
            const data:Playlist[] = await response.json();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="porst__left-side">
            <img className='post__image' alt='Фото аниму' src={props.imagePath}/>
            <div className='status__wrapper'>
                <p className='status__title'>Статус:</p>
                <select className='status__select' onSelect={selectStatus}>
                    <option className='status__option' value='1'>Планирую посмотреть</option>
                    <option className='status__option' value='2'>Смотрю</option>
                    <option className='status__option' value='3'>Просмотрено</option>
                </select>
            </div>
            <div className='post__playlists'>
                <button className='playlist__button' onClick={showPlaylists}>Добавить в плейлист</button>
                {playlistContent}
            </div>
        </div>
    )
}
export default PostStatus