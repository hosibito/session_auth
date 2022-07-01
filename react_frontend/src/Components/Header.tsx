import {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getUserInfo, Logout, setUserHidden } from '../actions/auth';
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
    const [is_hidden, set_is_hidden] = useState(false)
    
    // 로그인 처리( 로그인 중에는 유저데이터 정기적으로 가져옴 )
    let is_login_flg = false
    useEffect(() => {        
        if(islogin){
            is_login_flg=true
            GetLogInData()          
        }else{
            if(is_login_flg){
                GetLogInData()
                is_login_flg=false
                navigate("/login")
            }
        }       
    },[islogin, is_hidden])
      
    useInterval(() => { 
        if (islogin && !is_hidden)  {
            GetLogInData()  
        }
    },3000);   
    
    const GetLogInData = async() => {
        const res = await getUserInfo()  
        // console.log(res.detail) 
        console.log("ㅁㅁㅁㅁ", res.detail , islogin)  
        if(res.detail){
            if(isLogin){
                setisLogin(false)
                is_login_flg=false                          
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
        console.log("GetLogInData 처리 :" , res.username , islogin, is_login_flg , userprofile.username)  
    }
    

    // 탭 전환 처리
    useEffect(()=>{
        document.addEventListener('visibilitychange',handleVisibilityChange );       
        return () =>{
            document.addEventListener('visibilitychange',handleVisibilityChange );
        }
    })   

    const handleVisibilityChange = () => {    
        set_is_hidden(document.hidden)                  
    }

    useEffect(()=>{ 
        if(islogin){
            setUserHidden(is_hidden)  
        }
    },[is_hidden])   


    //로그아웃 처리(둘다할필요는 없지만 확실하게 로그아웃해야해서..)
    useEffect(()=>{
        window.addEventListener('beforeunload', OnLogout);
        return () => {
            window.removeEventListener('beforeunload', OnLogout)
        };
    })

    useEffect(()=>{
        window.addEventListener('unload', OnLogout);
        return () => {
            window.removeEventListener('unload', OnLogout)
        };
    })

    const OnLogout = async() => {
        if (islogin){
            const logoutRes = await Logout()
            console.log(logoutRes) 
            setisLogin(false)  
        }
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