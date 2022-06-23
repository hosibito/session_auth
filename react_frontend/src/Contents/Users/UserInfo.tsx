import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getUserInfo, IuUserInfo } from "../../actions/auth";
import { isLogin } from "../../atoms/loginState";

const Conteiner = styled.div`
    width: 100%;  
    height: 100%; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Loding = styled.div`
    font-size: 1.5rem;    
`;

const UserinfoConteiner = styled.div`
    width: 40%;
    height: 40%;
    border: 2px solid ${prop => prop.theme.bgColor}; 
    border-radius: 5px;
`;

const Tilte = styled.div`
    width: 100%;
    height: 10%;
    background-color: ${prop => prop.theme.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;       
    border-bottom:2px solid ${prop => prop.theme.bgColor};  
    div{
        font-size: 1.2rem;         
        margin: 0.2rem;
    }        
`;

const Infolist = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
        margin: 1rem;
    }
`;

function UserInfo() { 
    const { data, isLoading } = useQuery("user", getUserInfo);   
    const setislogin = useSetRecoilState(isLogin)
    
    let result_data
    let login_datetime
    let logout_datetime 
    
    if(!isLoading){       
        if (data?.detail){
            console.log(data)
            // {detail: '자격 인증데이터(authentication credentials)가 제공되지 않았습니다.'}
            // 강제 로그아웃되었을시 나온다. 처리해야함.
            setislogin(false)    
             
            // window.location.reload(); 
        }
        else{
            result_data = data as IuUserInfo
            login_datetime = (new Date(result_data.login_datetime)).toLocaleString()
            logout_datetime = (new Date(result_data.logout_datetime)).toLocaleString() 
        }
    }


    return (
        <Conteiner>
            {isLoading ? ( 
                <Loding>로딩중!!</Loding>
            ) : ( 
                <UserinfoConteiner>
                    <Tilte>
                        로그인 유저정보
                    </Tilte>
                    <Infolist>
                        <div>
                            <span>유저 PK : </span>
                            <span>{result_data?.id}</span> 
                        </div>
                        <div>
                            <span>유저명 : </span>
                            <span>{result_data?.username}</span> 
                        </div>
                        <div>
                            <span>등급 : </span>
                            <span>{result_data?.authority}</span> 
                        </div>
                        <div>
                            <span>로그인 IP : </span>
                            <span>{result_data?.login_ip}</span> 
                        </div>   
                        <div>
                            <span>로그인 : </span>
                            <span>{login_datetime}</span> 
                        </div> 
                        <div>
                            <span>로그아웃 : </span>
                            <span>{logout_datetime}</span> 
                        </div>                     
                    </Infolist>                 
                </UserinfoConteiner>
            )}
        </Conteiner>
    )
}

export default UserInfo;