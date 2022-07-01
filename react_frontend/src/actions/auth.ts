import Cookies from 'js-cookie';
import axios,  { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


const API_URL = process.env.REACT_APP_API_URL


// 로그인
export interface IloginForm {
    username: string;
    password: string;
}

export interface IResult {
    success?:string;
    error?:string;
    detail?:string;
}

export function Login_fetch(data : IloginForm) {
    return fetch("/api/session_auth_v1/users/login" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') as string
        },
        body: JSON.stringify(data)
    }).then(reponse => reponse.json())
}

export function Login_axios(data : IloginForm) {
    const config : AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') as string
        }
    };
    const body = JSON.stringify(data);
    return axios.post(`/api/session_auth_v1/users/login`, body, config )
}

//로그아웃
export function Logout() {
    return fetch('/api/session_auth_v1/users/logout').then((response) => response.json())
}

//회원가입
export interface ISignupForm {
    username: string;
    password: string;
    re_password: string;
}

export function Signup_fetch(data:ISignupForm){
    return fetch("/api/session_auth_v1/users/signup" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') as string
        },
        body: JSON.stringify(data)
    }).then(reponse => reponse.json())
}


export interface IuUserInfo{
    id: number;
    username: string;
    authority: string;
    login_datetime: string;
    login_ip: string;
    login_verified: boolean;
    logout_datetime: string; 
    is_login: boolean;  
}

// 일반유저 로그인 유저정보
export function getUserInfo() {   
    return fetch('/api/session_auth_v1/users/user').then((response) => response.json())
}

// 매니저 로그인 유저들 정보
export function getUsersInfoManage() {
    return fetch('/api/session_auth_v1/users/users').then((response) => response.json())
}


// 일반유저 탭전환
export function setUserHidden(data:boolean){    
    return fetch("/api/session_auth_v1/users/user" , {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') as string
        },
        body: JSON.stringify({ "is_hidden" : data })
    }).then(reponse => reponse.json())
}

export function getCSRFtoken() {
    return axios.get(`/api/session_auth_v1/users/csrf_cookie`).then(function (response) {       
        console.log(response.data);
    })
}
