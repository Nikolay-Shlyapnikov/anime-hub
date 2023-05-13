import { useEffect } from 'react';
import {redirect, useNavigate} from 'react-router-dom';
interface propsInterface{
    url: string;
}
const Redirect = (props:propsInterface) => {
    redirect(props.url);
    return (
        <div>Redirecting...</div>
    );
}
export default Redirect