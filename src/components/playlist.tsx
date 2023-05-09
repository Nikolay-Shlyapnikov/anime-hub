import React from 'react';
import './css/playlist.css'
interface playlistInterface{
    userId: number;
}
const Playlist = (props:playlistInterface) =>{
    const options ={
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            userId: props.userId
        })
    }
    let playlistArray = [
        {playlistName: 'Избранное', playlistCountPost: 20, playListVisibility: 1},
        {playlistName: 'Триллеры', playlistCountPost: 20, playListVisibility: 1},
        {playlistName: 'Сёнены', playlistCountPost: 20, playListVisibility: 1},
        {playlistName: 'Какая-то хуйня', playlistCountPost: 20, playListVisibility: 0}
    ];
    // fetch('url', options)
    //     .then(response => response.json())
    //     .then(data =>{
    //         playlistArray = data;
    //     });
    return(
        <div className='playlists'>
            <p className='playlists__title'>Ваши плейлисты</p>
            {playlistArray.map((elem, index)=>(
                <div className={'playlist'} key={'playlist'+index}>
                    <h3 className={'playlist__name'}>{elem.playlistName}</h3>
                    <p className={'playlist__count'}>Количество постов: {elem.playlistCountPost}</p>
                    <p className={'playlist__count'}>{elem.playListVisibility ? 'Публичный' : 'Приватный' }</p>
                </div>
            ))}
        </div>
    )
}

export default Playlist;