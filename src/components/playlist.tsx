import React, {useContext, useEffect, useState} from 'react';
import './css/playlist.css'
import {PlaylistInterface} from "./postStatus";
import {DomainContext} from "../index";
interface playlistInterface{
    userId: number;
}
const Playlist = (props:playlistInterface) =>{
    const domain = useContext(DomainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [playlists, setPlaylists] = useState<PlaylistInterface[]>();
    const [playlistContent, setPlaylistContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const showPlaylists = async ()=>{
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: props.userId
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
                    <p className='playlist__item' key={'playlist'+index}>
                        <span>{playlist.title}</span>
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
    return(
        <div className=''>
            <p className='playlists__title'>Ваши плейлисты</p>
            <div className={'playlists'}>
                {playlistContent}
            </div>
            {/*{playlistArray.map((elem, index)=>(*/}
            {/*    <div className={'playlist'} key={'playlist'+index}>*/}
            {/*        <h3 className={'playlist__name'}>{elem.playlistName}</h3>*/}
            {/*        <p className={'playlist__count'}>Количество постов: {elem.playlistCountPost}</p>*/}
            {/*        <p className={'playlist__count'}>{elem.playListVisibility ? 'Публичный' : 'Приватный' }</p>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    )
}

export default Playlist;