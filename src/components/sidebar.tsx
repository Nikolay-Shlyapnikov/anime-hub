import React, { useState } from 'react';
import Filter from "./filter";
import './css/sidebar.css'
import Sort from "./sort";
interface sidebarPropsInterface {
    onChangeFilterType: React.MouseEventHandler<HTMLLIElement>;
    onChangeFilterGenre: React.MouseEventHandler<HTMLLIElement>;
    filterType: string;
    filterGenre: string;
    filterGenreArray: Array<string>;
    filterTypeArray: Array<string>;
    onChangeSort: React.MouseEventHandler<HTMLLIElement>;
    sort: string;
}

const Sidebar = (props:sidebarPropsInterface) => {

    return (
        <section className="sidebar">
            <div className='sidebar__inner'>
                <Filter filterArray={props.filterGenreArray} onChangeFilter={props.onChangeFilterGenre} filterName={'Жанры'} filter={props.filterGenre}></Filter>
                <Filter filterArray={props.filterTypeArray} onChangeFilter={props.onChangeFilterType} filterName={'Типы'} filter={props.filterType}></Filter>
                <Sort onChangeSort={props.onChangeSort} sort={props.sort}></Sort>
            </div>
        </section>
    );
};

export default Sidebar;