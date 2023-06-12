import React, {useContext, useEffect, useState} from 'react'
import {userInfoInterface} from "../forms/login";
import '../css/post.css';
import {DomainContext} from "../../index";
import LikeForm from "../forms/likeForm";
import {userInfo} from "os";
import {useNavigate} from "react-router-dom";
export interface PlaylistInterface {
    playlistId:number
    createdAt: string
    title: string

}

interface propsInterface {
    id:number
    user: userInfoInterface
    imagePath: string
    onChangeRating: React.ChangeEventHandler<HTMLSelectElement>
    rating: null | number
}
const PostStatus = (props:propsInterface) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allPlaylists, setAllPlaylists] = useState<PlaylistInterface[]>();
    const [postPlaylists, setPostPlaylists] = useState<PlaylistInterface[]>();
    const [addPlaylistContent, setAddPlaylistContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const [deletePlaylistContent, setDeletePlaylistContent] = useState<JSX.Element[] | JSX.Element | null>(null);
    const [changePlaylist, setChangePlaylist] = useState(false);
    const navigate = useNavigate();
    const domain = useContext(DomainContext);
    const getAllPlaylists = async ()=>{
        if (props.user != null){
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
                setAllPlaylists(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }
    const getPostPLaylists = async  () =>{
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: props.user.personId,
                postId: props.id
            })
        };
        try {
            const response = await fetch(`${domain}/postsPlaylists`, requestOptions);
            const data:PlaylistInterface[] = await response.json();
            setPostPlaylists(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const addPostToPlaylist = async (e: React.MouseEvent<HTMLElement>) =>{
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                playlistId: e.currentTarget.dataset.value,
                postId: props.id
            })
        };
        try {
            const response = await fetch(`${domain}/addPlaylistItem`, requestOptions);
            const data = await response.json();
            if (data.success == 'true'){
                setChangePlaylist(!changePlaylist);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const deletePostFromPlaylist = async (e: React.MouseEvent<HTMLElement>) =>{
        if(props.user == null){
            navigate('/login')
        }
        else {
            setIsLoading(true);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    playlistId: e.currentTarget.dataset.value,
                    postId: props.id
                })
            };
            try {
                const response = await fetch(`${domain}/dropPlaylistItem`, requestOptions);
                const data = await response.json();
                if (data.success == 'true'){
                    setChangePlaylist(!changePlaylist);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }
    const renderPlaylists = () =>{
        const subtractedArray: PlaylistInterface[] = allPlaylists
            ? allPlaylists.filter(
                (playlist) =>
                    !postPlaylists?.some((postPlaylist) => playlist.playlistId === postPlaylist.playlistId)
            )
            : [];
        const addContent = allPlaylists ? subtractedArray!.map((playlist)=>{
            return <p className={'playlist__item'} key={playlist.playlistId}  onClick={addPostToPlaylist} data-value={playlist.playlistId}>{playlist.title}</p>
        }) : [];
        setAddPlaylistContent(addContent);
        const deleteContent = postPlaylists ? postPlaylists!.map((playlist)=>{
            return <p className={'playlist__item'} key={playlist.playlistId} onClick={deletePostFromPlaylist} data-value={playlist.playlistId}>{playlist.title}</p>
        }): []
        setDeletePlaylistContent(deleteContent);
    }
    useEffect(()=>{
        renderPlaylists();
    }, [postPlaylists, allPlaylists]);
    useEffect(()=>{
        getPostPLaylists();
        getAllPlaylists();
    }, [changePlaylist])


    return (
        <div className={'sidebar'}>
            <div className="post__left-side">
                <img className='post__image' alt='Фото аниму' src={props.imagePath}/>
                    { addPlaylistContent && props.user != null ? <div className='post__playlists'>
                        <p className='playlist__title'>Добавить в плейлист</p>
                        <div className={'playlist__wrapper'}>
                            {addPlaylistContent}
                        </div>
                    </div> : null}
                    { deletePlaylistContent && props.user != null ? <div className='post__playlists'>
                        <p className='playlist__title'>Удалить из плейлиста</p>
                        <div className={'playlist__wrapper'}>
                            {deletePlaylistContent}
                        </div>
                    </div> : null}
                    <LikeForm rating={props.rating} onChangeRating={props.onChangeRating} id={props.id}></LikeForm>
            </div>
        </div>
    )
}
export default PostStatus