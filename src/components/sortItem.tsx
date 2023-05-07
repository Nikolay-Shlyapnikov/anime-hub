import React from 'react';
interface filterItemInterface{
    onChangeSort: React.MouseEventHandler<HTMLElement>
    textContent: string;
    state: string;
    value: string;
}

const sortItem = (props:filterItemInterface) => {

    const changeClass = (event: React.MouseEvent<HTMLLIElement>) => {
        props.onChangeSort(event);
    };
    return (
        <li onClick={changeClass} data-value={props.value}  className={`sidebar__item ${props.state}`}>{props.textContent}</li>
    )
}
export default sortItem;