import React from 'react';
import FilterItem from "./filterItem";

interface filterInterface{
    onChangeFilter: React.MouseEventHandler<HTMLElement>
    filter: string;
    filterName: string;
    filterArray: Array<string>;
}
const Filter = (props: filterInterface) => {
    const filterValues = Array.from(props.filterArray, (text, i) =>  <FilterItem key={'filter'+(i+1)} onChangeFilter={props.onChangeFilter} dataValue={text} textContent={text}  isActive={props.filter == text ? 'active' : ''}></FilterItem>);
    return (
        <div className="sidebar__inner-wrapper">

            <h2 className="sidebar__title">{props.filterName}</h2>
            <ul className="sidebar__list">
                <FilterItem key={'filter'+1} onChangeFilter={props.onChangeFilter}  dataValue={''} textContent={'По умолчанию'}  isActive={''} ></FilterItem>
                {filterValues}
            </ul>
        </div>
    )
}
export default Filter;