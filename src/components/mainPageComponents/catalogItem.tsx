import React from 'react';
import { useNavigate } from "react-router-dom";
interface catalogItemInteface{
    id: number
    title: string
    year:string
    imagePath: string
    rating: number
}
const CatalogItem = (props: catalogItemInteface) =>{
    const postImagePath = props.imagePath ? props.imagePath : 'default.jpg'
    const navigate = useNavigate();
    const postItemCLick = () =>{
        navigate('/post', {state: props.id});
    }

    return (
        <div key={'post'+props.id} onClick={postItemCLick} className={'catalog__item'}>
            <img src={postImagePath} alt='Фото аниме' className="catalog__item-img"/>
                <p className="catalog__item-title">{props.title}</p>
                <div className="catalog__item-wrapper">
                    <p>{props.rating}/10</p>
                    <p className="catalog__item-year">{props.year}</p>
                </div>
        </div>
    )
}
export default CatalogItem;