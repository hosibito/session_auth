import {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getUserInfo, Logout } from '../actions/auth';
import useInterval from '../actions/customHook';
import { isLogin, userProfile } from '../atoms/loginState';


const Conteiner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;    
    background-color: ${prop => prop.theme.bgColor}; 
`;

const BaseDiv = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderLeft = styled(BaseDiv)`
    width: 25%;    
`;
const HeaderCenter = styled(BaseDiv)`
    width: 50%;
`;
const HeaderRight = styled(BaseDiv)`
    width: 25%;
`;

const LinkButton = styled(Link)`
    text-decoration: none; /* 링크의 밑줄 제거 */
    color: inherit; /* 링크의 색상 제거 */   
    font-size: 1rem;
    img{
      height: 100%;
    }
    :hover{
        font-weight:1000;
        color: ${prop => prop.theme.accentColor}
    }
    :active{
        opacity: 0.8;
    }
`;

const HeaderButton = styled.div`
    :hover{
        cursor: pointer;
        font-weight:1000;
        color: ${prop => prop.theme.accentColor}
    }
    :active{
        opacity: 0.8;
    }
`;

const Title = styled.div`   
    margin-right: 5rem;     
    font-size: 2rem;
    font-weight: 800;
`;

const Info = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-around;
`;

function Header() {  
    const navigate = useNavigate()
    const [ islogin, setisLogin] = useRecoilState(isLogin)
    const [ userprofile , setuserprofile ] = useRecoilState(userProfile)  
    const [ ckflg, setckflg] = useState(false)
    
    useEffect(() => {        
        ChackLoggedIn()       
    },[islogin])

    useInterval(() => {   
        ChackLoggedIn()
    },3000);   

    const ChackLoggedIn = () =>{
         // console.log(islogin, ckflg)
         if(islogin){
            setckflg(true)
            GetLogInData()          
        }else{
            if(ckflg){
                GetLogInData()
                setckflg(false)
                navigate("/login")
            }
        }
    }

    const GetLogInData = async() => {
        const res = await getUserInfo()  
        // console.log(res.detail) 
        if(res.detail === "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."){
            // console.log(res.error , islogin)  
            if(isLogin){
                setisLogin(false)
                setckflg(false)                             
            }
        } else {        
            // console.log(res.username , islogin, !islogin)  
            if(!islogin){     
                // console.log("내부", islogin)           
                setisLogin(true)
                setuserprofile({
                    id: res.id,
                    username: res.username,
                    authority:res.authority,
                })
            }
        }
        console.log("GetLogInData 처리 :" , res.username , islogin, ckflg , userprofile.username)  
    }

    const OnLogout = async() => {
        const logoutRes = await Logout()
        console.log(logoutRes) 
        setisLogin(false)  
    }      

    return (
        <Conteiner> 
            <HeaderLeft>
                <LinkButton  to={'/'}>              
                    logo(main)
                </LinkButton>
            </HeaderLeft>

            <HeaderCenter>
                <Title>SESSION AUTH</Title>
            </HeaderCenter>

            <HeaderRight>
                {islogin ? (
                    <Info>
                        <div><i className="fas fa-solid fa-user"></i> {userprofile.username}({userprofile.authority}) </div>
                        <LinkButton to={'/userinfo'}><i className="fas fa-solid fa-info"></i> 유저정보</LinkButton>                         
                        <HeaderButton onClick={OnLogout}>로그아웃</HeaderButton>  
                        { (userprofile.authority === "매니저") ? ( <LinkButton to={'/manager'}>관리페이지</LinkButton> ): (<></>)}           
                    </Info>
                ) : (
                    <Info>
                        <LinkButton to={'/login'}>로그인</LinkButton>
                        <LinkButton to={'/signup'}>회원가입</LinkButton>
                    </Info>
                )}
            </HeaderRight>
        </Conteiner>
    )
}

export default Header;