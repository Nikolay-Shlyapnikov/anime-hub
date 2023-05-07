import React, { useState } from 'react';
import Filter from "./filter";
import './css/sidebar.css'
import Sort from "./sort";
interface sidebarPropsInterface {
    onChangeFilter: React.MouseEventHandler<HTMLLIElement>;
    filter: string;
    filterArray: Array<string>;
    onChangeSort: React.MouseEventHandler<HTMLLIElement>;
    sort: string;
}

const Sidebar = (props:sidebarPropsInterface) => {

    return (
        <section className="sidebar">
            <Filter filterArray={props.filterArray} onChangeFilter={props.onChangeFilter} filter={props.filter}></Filter>
            <Sort onChangeSort={props.onChangeSort} sort={props.sort}></Sort>
        </section>
    );
};

export default Sidebar;