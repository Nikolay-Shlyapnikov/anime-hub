import React from 'react';
import './css/catalog.css'
import {Link} from "react-router-dom";
interface CatalogInterface {
    sort: string;
    filterType: {text: string, number: number};
    filterGenre: {text: string, number: number};
    sortBy: string;
}

const Catalog = (catalogProps: CatalogInterface) => {
    let sortSetting: {text: string, number: number};
    catalogProps.sort === 'date' ? sortSetting = {text: 'дате', number: 1}:
        catalogProps.sort === 'title' ? sortSetting ={text: 'алфавиту', number: 3}:
            catalogProps.sort === 'episode' ? sortSetting ={text: 'количеству эпизодов', number: 2} :
                catalogProps.sort === 'popular' ? sortSetting = {text: 'популярности', number: 4} :sortSetting = {text:'', number: 0};

    let sortBy: {text: string, number: number};
    catalogProps.sortBy === 'DESC' ?  sortBy = {text:'По убыванию', number: 1} : sortBy = {text:'По возрастанию', number: 0};
    const getSortedPosts = async () =>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               sort: sortSetting.number,
               sortBy: sortBy.number,
               filterType: catalogProps.filterType.number,
               filterGenre: catalogProps.filterGenre.number
            })
        }
        const arraySortedPosts = [];
        await fetch('http://10.0.0.65:5000/sortedPosts', requestOptions)
            .then(response => response.json())
            .then(data => {
                arraySortedPosts.push(data);
                console.log(data);
            });
    }
    getSortedPosts();
    const getPosts = async () =>{
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        const arrayPosts: {id: number, year: string, title: string, genre: string}[] = [];
        await fetch('http://10.0.0.65:5000/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                data.postInfo.forEach((post: {id: number, year: string, title: string, genre: string}) =>{
                    arrayPosts.push(post);
                });

            });
        return arrayPosts
    }
    getPosts();
    return (
        <section className="catalog">
            <h2 className="catalog__title">Аниме</h2>
            { catalogProps.filterGenre.text !== '' && catalogProps.filterGenre.text !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по жанру: {catalogProps.filterGenre.text}</p> : null}
            { catalogProps.filterType.text !== '' && catalogProps.filterType.text !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по типу: {catalogProps.filterType.text}</p> : null}
            {sortSetting.text !== 'default' && sortSetting.text !== '' ? <p className="catalog__subtitle">Сортировка по {sortSetting.text} ({sortBy.text})</p> : null}
            { }
            <div className="catalog__wrapper">
                <Link to='/post/1'>
                    <div className="catalog__item catalog__item--black">
                        <img src="" alt="" className="catalog__item-img"/>
                        <p className="catalog__item-title">Стальной алхимик</p>
                        <div className="catalog__item-wrapper">
                            <p className="catalog__item-genre">TV сериал</p>
                            <p className="catalog__item-year">2002</p>
                        </div>
                    </div>
                </Link>

            </div>
        </section>
    );
};

export default Catalog;