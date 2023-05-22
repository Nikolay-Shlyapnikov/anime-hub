import React, {useContext, useEffect, useState} from 'react'
import '../css/post.css';
import {DomainContext} from "../../index";
interface propsInterface {
    id: number,
    onChangeRating: React.ChangeEventHandler<HTMLSelectElement>
}

const LikeForm = (props:propsInterface) => {
    const [isLoading, setIsLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user')!).personId
    const domain = useContext(DomainContext);

    let options = Array.from({ length: 11 }, (_, i) => <option key={i} value={i}>{i}</option>);
    return (
            <div className={'select__wrapper'}>
                <p className={'select__title'}>Укажите рейтинг: </p>
                <select onChange={props.onChangeRating} className={'select'}>
                    {options}
                </select>
            </div>
    )
}
export default LikeForm