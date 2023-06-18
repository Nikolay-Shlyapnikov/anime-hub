import React,{ useState, useEffect, useContext } from 'react';
import {DomainContext} from "../../index";
import '../css/catalog.css'
import CatalogItem from "./catalogItem";
import {userInfo} from "os";
interface CatalogInterface {
    sort: string
    filterType: {text: string, number: number}
    filterGenre: {text: string, number: number}
    sortBy: string
    search: string
}
interface Post {
    id: number
    createdAt: string
    title: string
    description: string
    year: string
    imagePath: string
    videoPath:string
    episodeCount:number
    episodeDuration:string
    userId: number
    typeId: number
    rating: number
    genreId: number
}
const Catalog = (catalogProps: CatalogInterface) => {
    const domain = useContext(DomainContext);
    const userInfo = JSON.parse(localStorage.getItem('user')!)
    let sortSetting: {text: string, number: number};
    catalogProps.sort === 'date' ? sortSetting = {text: 'дате', number: 1}:
        catalogProps.sort === 'title' ? sortSetting ={text: 'алфавиту', number: 3}:
            catalogProps.sort === 'episode' ? sortSetting ={text: 'количеству эпизодов', number: 2} :
                catalogProps.sort === 'popular' ? sortSetting = {text: 'популярности', number: 4} :sortSetting = {text:'', number: 0};

    let sortBy: {text: string, number: number};
    catalogProps.sortBy === 'DESC' ?  sortBy = {text:'По убыванию', number: 1} : sortBy = {text:'По возрастанию', number: 0};


    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const getSortedPosts = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sort: sortSetting.number,
                sortBy: sortBy.number,
                filterType: catalogProps.filterType.number,
                filterGenre: catalogProps.filterGenre.number,
                userId: userInfo != null ? userInfo.personId : ''
            })
        };
        try {
            const response = await fetch(`${domain}/sortedPosts`, requestOptions);
            const data:Post[] = await response.json();
            setPosts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getSortedPosts();
    }, [catalogProps.sort,catalogProps.sortBy,catalogProps.filterType,catalogProps.filterGenre ]);
   const searchPost = async () => {
       setIsLoading(true);
       const requestOptions = {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
              search: catalogProps.search
           })
       };
       try {
           const response = await fetch(`${domain}/search`, requestOptions);
           const data:Post[] = await response.json();
           setPosts(data);
       } catch (error) {
           console.log(error);
       } finally {
           setIsLoading(false);
       }
   }
    useEffect(() => {
        searchPost();
    }, [catalogProps.search]);
    let catalogContent;
    if(posts.length == 0){
        catalogContent = <p className="catalog__title">Посты не найдены</p>;
    }
    if (posts.length > 0){
        catalogContent = (posts as Post[]).map((post) => {
            return (
                <CatalogItem
                    key={'post' + post.id}
                    id={post.id}
                    title={post.title}
                    year={post.year}
                    imagePath={post.imagePath}
                    rating={post.rating}
                />
            )
        });
    }
    if(isLoading){
        catalogContent = <p>Загрузка</p>;
    }
    return (
        <section className="catalog">
            <h2 className="catalog__title">Аниме</h2>
            { catalogProps.filterGenre.text !== '' && catalogProps.filterGenre.text !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по жанру: {catalogProps.filterGenre.text}</p> : null}
            { catalogProps.filterType.text !== '' && catalogProps.filterType.text !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по типу: {catalogProps.filterType.text}</p> : null}
            {sortSetting.text !== 'default' && sortSetting.text !== '' ? <p className="catalog__subtitle">Сортировка по {sortSetting.text} ({sortBy.text})</p> : null}
            <div className="catalog__wrapper">
                {catalogContent}
            </div>
        </section>
    );
};

export default Catalog;