import React, {useState} from 'react';
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Catalog from "../components/catalog";
import '../components/css/style.css'
import '../components/css/null.css'
import Sidebar from "../components/sidebar";

interface mainPageInterface {
    filterType: {text: string, number: number};
    filterGenre: {text: string, number: number};
    sort: string;
    sortItemState: string;
    sortBy: string;
    filterGenreArray: {text: string, number: number}[];
    filterTypeArray: {text: string, number: number}[];
}
function MainPage() {
    const filterType = [
        {text: 'TV Сериал', number: 1},
        {text: 'Клип', number: 2},
        {text: 'Спешл', number: 3},
        {text: 'Фильм', number: 4},
        {text: 'Сериал', number: 5}];
    const filterGenre = [
        {text: 'Детектив', number: 1},
        {text: 'Триллер', number: 2},
        {text: 'Сёнен', number: 3},
        {text: 'Психология', number: 4},
        {text: 'Драма', number: 5}];
    const [mainState, setState] = useState<mainPageInterface>({
        filterType: { text: '', number: 0},
        filterGenre: { text: '', number: 0},
        sort: '',
        sortItemState:'',
        sortBy: '',
        filterGenreArray: filterGenre,
        filterTypeArray: filterType
    });
    const location = useLocation();
    const changeFilterType = (event: React.MouseEvent<HTMLElement>) => {
        const filterNumber = Number(event.currentTarget.dataset.value!)
        const filterText = event.currentTarget.textContent!
        setState((prevState)=> ({...prevState, filterType: {text: filterText, number: filterNumber} }));
    };
    const changeFilterGenre = (event: React.MouseEvent<HTMLElement>) => {
        const filterNumber = Number(event.currentTarget.dataset.value!)
        const filterText = event.currentTarget.textContent!
        setState((prevState)=> ({...prevState, filterGenre: {text: filterText, number: filterNumber} }));
    };
    const changeSort = (event: React.MouseEvent<HTMLElement>) => {
        let sortTarget = event.currentTarget.dataset.value!;
        let sortValue:string;
        let sortBy:string;
        if( mainState.sortItemState.replace('DESC', '') !== sortTarget ||
            mainState.sortItemState.replace('ASC', '') !== sortTarget){
            sortValue = sortTarget+'DESC';
            sortBy = 'DESC';
        }
        if(mainState.sortItemState == 'default'){
            sortValue = sortTarget+'DESC';
            sortBy = 'DESC';
        }
        if (mainState.sortItemState == sortTarget+'DESC'){
            sortValue = sortTarget+'ASC';
            sortBy = 'ASC';
        }
        if (mainState.sortItemState == sortTarget+'ASC'){
            sortValue = '';
            sortBy = '';
            sortTarget = '';
        }
        if(sortTarget == ''){
            sortValue = '';
            sortBy = '';
            sortTarget = '';
        }
        setState((prevState)=> ({...prevState,sort: sortTarget, sortItemState: sortValue, sortBy: sortBy}));
    }
    return (
        <div>
            <Header/>
            <main className="main-page__container container">
                <Sidebar
                    onChangeFilterType={changeFilterType}
                    onChangeFilterGenre={changeFilterGenre}
                    filterGenre={mainState.filterGenre}
                    filterType={mainState.filterType}
                    filterGenreArray={mainState.filterGenreArray}
                    filterTypeArray={mainState.filterTypeArray}
                    onChangeSort={changeSort}
                    sort={mainState.sortItemState}
                ></Sidebar>
                {<Catalog filterType={mainState.filterType} filterGenre={mainState.filterGenre} sortBy={mainState.sortBy} sort={mainState.sort}></Catalog>}
            </main>
        </div>

    );
}

export default MainPage