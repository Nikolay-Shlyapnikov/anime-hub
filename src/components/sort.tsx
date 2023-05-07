import React from 'react';
import SortItem from "./sortItem";

interface sortInterface{
    onChangeSort: React.MouseEventHandler<HTMLElement>
    sort: string
}
const Sort= (props: sortInterface) => {

    return (
        <div className="sidebar__inner">
        <h2 className="sidebar__title">Сортировать по:</h2>
        <ul className="sidebar__list">
            <SortItem onChangeSort={props.onChangeSort} value={'date'} state={
               props.sort == 'dateASC' ? 'ASC':
               props.sort == 'dateDESC'? 'DESC': 'default'
            } textContent={'Дате выхода'}></SortItem>
            <SortItem onChangeSort={props.onChangeSort} value={'episode'} state={
                props.sort == 'episodeASC' ? 'ASC':
                props.sort == 'episodeDESC'? 'DESC': 'default'
            } textContent={'Кол-ву эпизодов'}></SortItem>
            <SortItem onChangeSort={props.onChangeSort} value={'title'} state={
                props.sort == 'titleASC' ? 'ASC':
                props.sort == 'titleDESC'? 'DESC': 'default'
            } textContent={'Алфавиту'}></SortItem>
        </ul>
        </div>
    )
}
export default Sort;