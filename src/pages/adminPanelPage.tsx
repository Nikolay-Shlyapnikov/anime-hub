import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/header";
import '../components/css/adminPanel.css'
import UserItem from "../components/userItem";
import {DomainContext} from "../index";
export interface user{
    createdAt: string
    age: number
    personAvatar: string
    email: string
    personId: number
    login: string
    role: number
    xxxContent: number
}
export interface role{
    roleId: number
    roleName: string
}
interface adminPanelInterface {
    search: string;
    users: Array<user>
    roles: Array<role>
}
function MainPage() {
    const domain = useContext(DomainContext);
    const [state, setState] = useState<adminPanelInterface>({
        search: '',
        users: [],
        roles: []
    });
    const userInfo = JSON.parse(localStorage.getItem('user')!)
    const getUsers = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                personId: userInfo.personId
            })
        }
        await fetch(`${domain}/userList`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setState(prevState => {
                    return {
                        ...prevState,
                        users: data
                    };
                });
            });
    }
    const getRoles = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                personId: userInfo.personId
            })
        }
        await fetch(`${domain}/roleList`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setState(prevState => {
                    return {
                        ...prevState,
                        roles: data
                    };
                });
            });
    }
    useEffect(()=>{
        getUsers();
        getRoles();
    }, []);
    const userList = (state.users as adminPanelInterface['users']).map((user, index) => {
        return (
            <UserItem user={user} roles={state.roles}/>
        )
    });
    return (
        <div>
            <Header/>
            <main className="container">
                <table className={'user__table'} align={'center'}>
                    <caption>Таблица пользователей</caption>
                    <thead>
                        <th>Логин</th>
                        <th>Дата регистрации</th>
                        <th>Email:</th>
                        <th>Возраст</th>
                        <th>18+?</th>
                        <th>Роль</th>
                    </thead>
                    {userList}
                </table>
            </main>
        </div>

    );
}

export default MainPage