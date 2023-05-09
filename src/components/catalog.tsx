import React from 'react';
import './css/catalog.css'
import {Link} from "react-router-dom";
interface CatalogInterface {
    sort: string;
    filterType: string;
    filterGenre: string;
    sortBy: string;
}

const Catalog = (catalogProps: CatalogInterface) => {
    let sort;
    catalogProps.sort === 'date' ? sort = 'дате' :
        catalogProps.sort === 'title' ? sort = 'алфавиту' :
            catalogProps.sort === 'episode' ? sort = 'количеству эпизодов' :
                catalogProps.sort === 'popular' ? sort='популярности' : sort = '';

    let sortBy;
    catalogProps.sortBy === 'DESC' ?  sortBy = 'По убыванию' : sortBy = 'По возрастанию';
    return (
        <section className="catalog">
            <h2 className="catalog__title">Аниме</h2>
            { catalogProps.filterGenre !== '' && catalogProps.filterGenre !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по жанру: {catalogProps.filterGenre}</p> : null}
            { catalogProps.filterType !== '' && catalogProps.filterType !=='По умолчанию' ? <p className="catalog__subtitle">Фильтрация по типу: {catalogProps.filterType}</p> : null}
            { catalogProps.sort !== 'default' && catalogProps.sort !== '' ? <p className="catalog__subtitle">Сортировка по {sort} ({sortBy})</p> : null}
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