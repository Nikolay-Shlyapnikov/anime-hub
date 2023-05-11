import React, { useState } from 'react';
import Filter from "./filter";
import './css/sidebar.css'
import Sort from "./sort";
interface sidebarPropsInterface {
    onChangeFilterType: React.MouseEventHandler<HTMLLIElement>;
    onChangeFilterGenre: React.MouseEventHandler<HTMLLIElement>;
    filterType: {text: string, number: number};
    filterGenre: {text: string, number: number};
    filterGenreArray: {text: string, number: number}[];
    filterTypeArray: {text: string, number: number}[];
    onChangeSort: React.MouseEventHandler<HTMLLIElement>;
    sort: string;
}

const Sidebar = (props:sidebarPropsInterface) => {

    return (
        <section className="sidebar">
            <div className='sidebar__inner'>
                <Filter filterArray={props.filterGenreArray} onChangeFilter={props.onChangeFilterGenre} filterName={'Жанры'} filter={props.filterGenre.number}></Filter>
                <Filter filterArray={props.filterTypeArray} onChangeFilter={props.onChangeFilterType} filterName={'Типы'} filter={props.filterType.number}></Filter>
                <Sort onChangeSort={props.onChangeSort} sort={props.sort}></Sort>
            </div>
        </section>
    );
};

export default Sidebar;