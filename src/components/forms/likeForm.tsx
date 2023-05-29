import React from 'react'
import '../css/post.css';
interface propsInterface {
    id: number,
    onChangeRating: React.ChangeEventHandler<HTMLSelectElement>
    rating: number | null
}

const LikeForm = (props:propsInterface) => {
    let options = Array.from({ length: 11 }, (_, i) => {

        return (
            <option
                selected={props.rating ? props.rating === i  : false}
                key={i}
                value={i}>{i}
            </option>
        )
    });
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