import React,{ useState, useEffect } from 'react';
import './css/catalog.css'
import CatalogItem from "./catalogItem";
interface CatalogInterface {
    sort: string;
    filterType: {text: string, number: number};
    filterGenre: {text: string, number: number};
    sortBy: string;
}
interface Post {
        id: number,
        createdAt: string,
        title: string,
        description: string,
        year: string,
        imagePath: string,
        videoPath:string,
        episodeCount:number,
        episodeDuration:string,
        userId: number,
        typeId: number,
        rating: number,
        genreId: number
}
const Catalog = (catalogProps: CatalogInterface) => {

    let sortSetting: {text: string, number: number};
    catalogProps.sort === 'date' ? sortSetting = {text: 'дате', number: 1}:
        catalogProps.sort === 'title' ? sortSetting ={text: 'алфавиту', number: 3}:
            catalogProps.sort === 'episode' ? sortSetting ={text: 'количеству эпизодов', number: 2} :
                catalogProps.sort === 'popular' ? sortSetting = {text: 'популярности', number: 4} :sortSetting = {text:'', number: 0};

    let sortBy: {text: string, number: number};
    catalogProps.sortBy === 'DESC' ?  sortBy = {text:'По убыванию', number: 1} : sortBy = {text:'По возрастанию', number: 0};
    const [posts, setPosts] = useState<Post[]>([])
    const getSortedPosts = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sort: sortSetting.number,
                sortBy: sortBy.number,
                filterType: catalogProps.filterType.number,
                filterGenre: catalogProps.filterGenre.number
            })
        };

        const response = await fetch('http://10.0.0.65:5000/sortedPosts', requestOptions);
        const data = await response.json();
        console.log(data);
        setPosts(data);
    };
    useEffect(() => {
        getSortedPosts();
    }, [catalogProps.sort,catalogProps.sortBy,catalogProps.filterType,catalogProps.filterGenre ]);
    const postsItems = posts.map((post, index) => {
           return(
               <CatalogItem
                   key={post.id}
                   id={post.id}
                   title={post.title}
                   year={post.year}
                   type={post.typeId}
                   imagePath={post.imagePath}
               />
           )
    });
    return (
        <section className="catalog">
            <h2 className="catalog__title">Аниме</h2>
            { catalogProps.filterGenre.text !== '' && catalogProps.filterGenre.text !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по жанру: {catalogProps.filterGenre.text}</p> : null}
            { catalogProps.filterType.text !== '' && catalogProps.filterType.text !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по типу: {catalogProps.filterType.text}</p> : null}
            {sortSetting.text !== 'default' && sortSetting.text !== '' ? <p className="catalog__subtitle">Сортировка по {sortSetting.text} ({sortBy.text})</p> : null}
            { }
            <div className="catalog__wrapper">
                {postsItems}
            </div>
        </section>
    );
};

export default Catalog;