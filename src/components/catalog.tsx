import React from 'react';

interface CatalogInterface {
    sort: string;
    filter: string;
    sortBy: string;
}

const Catalog = (catalogProps: CatalogInterface) => {
    let sort;
    catalogProps.sort === 'date' ? sort = 'дате' :
        catalogProps.sort === 'title' ? sort = 'алфавиту' :
            catalogProps.sort === 'episode' ? sort = 'количеству эпизодов' : sort = '';

    let sortBy;
    catalogProps.sortBy === 'ASC' ?  sortBy = 'По убыванию' : sortBy = 'По возрастанию';
    return (
        <section className="catalog">
            <h2 className="catalog__title">Аниме</h2>
            { catalogProps.filter !== '' ? <p className="catalog__subtitle">Фильтрация по жанру: {catalogProps.filter}</p> : null}
            { catalogProps.sort !== '' ? <p className="catalog__subtitle">Сортировка по {sort} ({sortBy})</p> : null}
            <div className="catalog__wrapper">
                <div className="catalog__item catalog__item--black">
                    <img src="" alt="" className="catalog__item-img"/>
                    <p className="catalog__item-title">Стальной алхимик</p>
                    <div className="catalog__item-wrapper">
                        <p className="catalog__item-type">TV сериал</p>
                        <p className="catalog__item-year">2002</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Catalog;