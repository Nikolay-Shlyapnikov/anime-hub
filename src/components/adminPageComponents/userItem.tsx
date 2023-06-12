import React, {useContext, useState, useEffect} from 'react';
import {user} from "../../pages/adminPanelPage";
import {role} from "../../pages/adminPanelPage";
import {DomainContext} from "../../index";
interface userItemInterface{
    user: user;
    roles: Array<role>
}

const UserItem = (props:userItemInterface) => {
    const domain = useContext(DomainContext);
    const [roleStatus, setRoleStatus] = useState(null)
    const changeRole = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personId: props.user.personId,
                roleId: event.target.value
            })
        }
        console.log(requestOptions.body);
        await fetch(`${domain}/updateRole`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRoleStatus(data.success);
            });
    };

    const options = props.roles.map((role, i) => {
       if(role.roleId != 1 && role.roleId != 0)
       {
           return(
           <option
               key={'role-'+i}
               value={role.roleId}
               selected={role.roleId === props.user.role}>
               {role.roleName}
           </option>
           )
       }
    });
    useEffect(() => {
        if (roleStatus) {
            const timer = setTimeout(() => {
                setRoleStatus(null);
            }, 4000); // Set the desired duration for the roleStatus element to remain visible (in milliseconds)
            return () => clearTimeout(timer);
        }
    }, [roleStatus]);
    return (
        <tr key={props.user.personId}className={'user__item'}>
            <td className={'user__login'}>{props.user.login}</td>
            <td className={'user__date'}>{props.user.createdAt}</td>
            <td className={'user__p'}>{props.user.email}</td>
            <td className={'user__p'}>{props.user.age}</td>
            <td className={'user__'}>{props.user.xxxContent}</td>
            <td className={'user__select-wrapper'}>
                <select onChange={changeRole} className={'select user__select'}>
                    {options}
                </select>
               <p className={roleStatus ? 'role__status green fade-out' : 'role__status'}>{roleStatus}</p>
            </td>
        </tr>
    )
}
export default UserItem;