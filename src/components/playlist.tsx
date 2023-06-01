import React, {useContext, useEffect, useState} from 'react';
import './css/playlist.css'
import {PlaylistInterface} from "./postStatus";
import {PostInterface} from "../pages/postPage";
import {DomainContext} from "../index";
import {useNavigate} from "react-router-dom";
interface playlistInterface{
    userId: number;
    setPlaylistCount:Function;
}

const Playlist = (props:playlistInterface) =>{
    const domain = useContext(DomainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [playlists, setPlaylists] = useState<PlaylistInterface[]>();
    const [activePlaylistId, setActivePlaylistId] = useState<number | null>();
    const [playlistContent, setPlaylistContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const [postContent, setPostContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const navigate = useNavigate();
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
            props.setPlaylistCount(data.length);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const linkToPost = (e: React.MouseEvent<HTMLElement>) =>{
        navigate('/post', {state: parseInt(e.currentTarget.dataset.id!)});
    }
    const getPlaylistItems = async (event:React.MouseEvent<HTMLElement>) =>{
        const playlistItemId = parseInt(event.currentTarget.dataset.id!);
        if (playlistItemId) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    playlistId: event.currentTarget.dataset.id
                })
            };
            try {
                const response = await fetch(`${domain}/getPlaylistsItems`, requestOptions);
                const data:PostInterface[] = await response.json();
                setActivePlaylistId(playlistItemId);
                const postContentValue =  data.map((post, index) =>{
                    return (
                        <li key={'post'+index} className={'profile__post-item'}>
                            <span className={'post__number'}>{index+1}.</span>
                            <p data-id={post.id} onClick={linkToPost} className={'profile__post-item-title'}>{post.title}</p>
                        </li>
                    );
                });
                setPostContent(postContentValue);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }
    const deletePlaylist = async (event:React.MouseEvent<HTMLElement>) =>{
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: props.userId,
                playlistId: event.currentTarget.dataset.id
            })
        };
        try {
            const response = await fetch(`${domain}/dropPlaylist`, requestOptions);
            const data = await response.json();
            if(data.success == 'true'){
                showPlaylists();
            }
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
        else {
            const content = (playlists as PlaylistInterface[]).map((playlist, index) => {
                return (
                    <div>
                        <div className='profile__playlist-item' key={'playlist'+index}>
                            <p onClick={getPlaylistItems} data-id={playlist.playlistId} className={'playlist__name'}>{playlist.title}
                                <div onClick={deletePlaylist} data-id={playlist.playlistId} className={'playlist__button cross'} ></div>
                            </p>
                            {
                                postContent!= null && playlist.playlistId === activePlaylistId ?
                                <ul className={'post__list'}>
                                    {postContent}
                                </ul>
                            : null}

                        </div>
                    </div>
                )
            });
            setPlaylistContent(content);
        }
    }, [playlists, activePlaylistId, postContent]);
    useEffect(()=>{
        showPlaylists();
    }, []);

    return(
        <div className=''>
            <p className='playlists__title'>Ваши плейлисты</p>
            <div className={'playlists'}>
                {playlistContent}
            </div>
        </div>
    )
}

export default Playlist;