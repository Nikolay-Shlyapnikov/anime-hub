import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/header";
import '../components/css/adminPanel.css'
import UserItem from "../components/adminPageComponents/userItem";
import {DomainContext} from "../index";
import {useNavigate} from "react-router-dom";
import Search from "../components/mainPageComponents/search";

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
interface report{
    commentId: number
    commentText: string
    createdAt: string
    postId: number
    postTitle: string
    reportId: number
    reportsCount: number
    commentAuthor: string
}
interface adminPanelInterface {
    search: string;
    users: Array<user>
    roles: Array<role>
    reports: Array<report>
}

function MainPage() {
    const domain = useContext(DomainContext);
    const navigate = useNavigate();
    const [state, setState] = useState<adminPanelInterface>({
        search: '',
        users: [],
        roles: [],
        reports: []
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
            setState(prevState => {
                return {
                    ...prevState,
                    reports: data
                };
            });
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

    const userList = state.users.length > 0 ? (state.users as adminPanelInterface['users']).map((user, index) => {
        return (
            <UserItem user={user} roles={state.roles}/>
        )
    }) :  <tr className={'user__table-empty'}><td colSpan={6}>Пользователи не найдены</td></tr>;
    const postItemCLick = (e: React.MouseEvent<HTMLElement>) =>{
        navigate('/post', {state: e.currentTarget.dataset.post_id});
    }
    const deleteComment = async (e: React.MouseEvent<HTMLElement>)=>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                reportId: e.currentTarget.dataset.report_id,
                commentId: e.currentTarget.dataset.comment_id
            })
        };
        try {
            const response = await fetch(`${domain}/delReportComment`, requestOptions);
            const data = await response.json();
            if(data.success === 'true'){
                getReports();
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    const deleteReport = async (e: React.MouseEvent<HTMLElement>)=>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                reportId: e.currentTarget.dataset.report_id
            })
        };
        try {
            const response = await fetch(`${domain}/pardonReport`, requestOptions);
            const data = await response.json();
            if(data.success === 'true'){
                getReports();
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    const reportList =  state.reports.length > 0 ? (state.reports as adminPanelInterface['reports']).map((report, index)=>{
        return (
            <>
                <p className={'report__table-cell'}>{report.commentText}</p>
                <p className={'report__table-cell'}>{report.commentAuthor}</p>
                <p className={'report__table-cell'}>{report.reportsCount}</p>
                <p className={'report__table-cell post__cell'} data-post_id={report.postId} onClick={postItemCLick}>{report.postTitle}</p>
                <div className={'report__table-cell'} >
                    <button data-report_id={report.reportId} data-comment_id={report.commentId} onClick={deleteComment}>
                        Удалить
                    </button>
                    <button data-report_id={report.reportId} onClick={deleteReport}>Оставить</button>
                </div>
            </>
        )
    }) : <h3 className={'report__table-title'}>Жалобы отсутствуют</h3>;
    const getSearchUser = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        if(value !=null){
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    search: value,
                    personId: userInfo.personId
                })
            }
            try {
                const response = await fetch(`${domain}/searchUser`, requestOptions);
                const data = await response.json();
                if(data.length > 0){
                    setState(prevState => {
                        return {
                            ...prevState,
                            users: data
                        };
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div>
            <Header/>
            <main className="container">
                {
                    userInfo.personRole == 4 ?
                   <table className={'user__table'} >
                    <caption>Пользователи <Search onChangeSearch={getSearchUser}/></caption>
                    <thead>
                        <th>Логин</th>
                        <th>Дата регистрации</th>
                        <th>Email:</th>
                        <th>Возраст</th>
                        <th>18+?</th>
                        <th>Роль</th>
                    </thead>
                    {userList}
                </table> : null}
                <h3 className={'report__table-title'}>Жалобы</h3>
                <div className={'report__table'}>
                    <p className={'report__table-head'}>Текст комментария</p>
                    <p className={'report__table-head'}>Автор комментария</p>
                    <p className={'report__table-head'}>Количество жалоб</p>
                    <p className={'report__table-head'}>К посту:</p>
                    <p className={'report__table-head'}>Действие</p>
                    {reportList}
                </div>
            </main>
        </div>

    );
}

export default MainPage