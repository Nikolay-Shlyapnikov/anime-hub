import React from 'react';
import {Link} from "react-router-dom";
interface catalogItemInteface{
    id: number
    title: string;
    year:string;
    type:number;
    imagePath: string,
}
const catalogItem = (props: catalogItemInteface) =>{
    const postImagePath = props.imagePath ? props.imagePath : 'default.jpg'
    return (
        <Link to={`/post/${props.id}`} className={'catalog__item'}>
            <img src={`public/image/post/${postImagePath}`} alt='Фото аниме' className="catalog__item-img"/>
                <p className="catalog__item-title">{props.title}</p>
                <div className="catalog__item-wrapper">
                    <p className="catalog__item-type">{props.type}</p>
                    <p className="catalog__item-year">{props.year}</p>
                </div>
        </Link>
    )
}
export default catalogItem;