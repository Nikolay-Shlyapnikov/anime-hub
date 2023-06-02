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
        try {
            const response = await fetch(`${domain}/userList`, requestOptions);
            const data = await response.json();
            setState(prevState => {
                return {
                    ...prevState,
                    users: data
                };
            });
        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    const getRoles = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                personId: userInfo.personId
            })
        };
        try {
            const response = await fetch(`${domain}/roleList`, requestOptions);
            const data = await response.json();
            setState(prevState => {
                return {
                    ...prevState,
                    roles: data
                };
            });
        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    const getReports = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                personId: userInfo.personId
            })
        };
        try {
            const response = await fetch(`${domain}/getReports`, requestOptions);
            const data = await response.json();
            console.log(data);
            // setState(prevState => {
            //     return {
            //         ...prevState,
            //         roles: data
            //     };
            // });
        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    useEffect(()=>{
        getUsers();
        getRoles();
        getReports();
    }, []);
    const userList = (state.users as adminPanelInterface['users']).map((user, index) => {
        return (
            <UserItem user={user} roles={state.roles}/>
        )
    });
    const reportList = 0;
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
                <table className={'report__table'} align={'center'}>
                    <caption>Таблица жалоб</caption>
                    <thead>
                        <th>Отправил:</th>
                        <th>Текст комментария</th>
                        <th>Автор комментария</th>
                        <th>Действие</th>
                    </thead>
                    {reportList}
                </table>
            </main>
        </div>

    );
}

export default MainPage