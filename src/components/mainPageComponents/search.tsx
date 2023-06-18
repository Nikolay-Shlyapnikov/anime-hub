import React from 'react';
interface searchInteface{
    onChangeSearch: React.ChangeEventHandler<HTMLInputElement>;
}
const Search = (props: searchInteface) =>{

    return (
        <div className={'catalog__item'}>
            <input placeholder={'Поиск...'} className={'search_input'} onChange={props.onChangeSearch}/>
        </div>
    )
}
export default Search;