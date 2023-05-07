import React from 'react';
import FilterItem from "./filterItem";

interface filterInterface{
    onChangeFilter: React.MouseEventHandler<HTMLElement>
    filter: string
    filterArray: Array<string>;
}
const Filter = (props: filterInterface) => {
    const filterValues = Array.from(props.filterArray, (text, i) =>  <FilterItem key={'filter'+i} onChangeFilter={props.onChangeFilter} dataValue={text} textContent={text}  isActive={props.filter == text ? 'active' : ''}></FilterItem>);
    return (
        <div className="sidebar__inner">
            <h2 className="sidebar__title">Жанры</h2>
            <ul className="sidebar__list">
                {filterValues}
            </ul>
        </div>
    )
}
export default Filter;