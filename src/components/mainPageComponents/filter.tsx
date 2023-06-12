import React from 'react';
import FilterItem from "./filterItem";

interface filterInterface{
    onChangeFilter: React.MouseEventHandler<HTMLElement>
    filter: number;
    filterName: string;
    filterArray: {text: string, number: number}[];
}
const Filter = (props: filterInterface) => {
    const filterValues = props.filterArray.map((filterValue, index) => (
        <FilterItem
            key={'filter' + (index + 1)}
            onChangeFilter={props.onChangeFilter}
            dataValue={filterValue.number}
            textContent={filterValue.text}
            isActive={props.filter === filterValue.number ? 'active' : ''}
        />
    ));


    return (
        <div className="sidebar__inner-wrapper">

            <h2 className="sidebar__title">{props.filterName}</h2>
            <ul className="sidebar__list">
                <FilterItem key={'filter'+1} onChangeFilter={props.onChangeFilter}  dataValue={0} textContent={'По умолчанию'}  isActive={''} ></FilterItem>
                {filterValues}
            </ul>
        </div>
    )
}
export default Filter;