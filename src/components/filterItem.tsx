import React from 'react';
interface filterItemInterface{
    onChangeFilter: React.MouseEventHandler<HTMLElement>
    textContent: string;
    isActive: string;
    dataValue: string;
}

const FilterItem = (props:filterItemInterface) => {

    const changeClass = (event: React.MouseEvent<HTMLLIElement>) => {
        props.onChangeFilter(event);
    };
    return (
        <li onClick={changeClass} data-value={props.dataValue}  className={`sidebar__item ${props.isActive}`}>{props.textContent}</li>
    )
}
export default FilterItem;