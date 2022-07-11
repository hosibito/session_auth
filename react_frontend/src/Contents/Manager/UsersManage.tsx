import { useQuery } from "react-query";
import styled from "styled-components";
import { getUsersInfoManage, IuUserInfo } from "../../actions/auth";

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

const UsersinfoConteiner = styled.div`
    width: 90%;
    height: 80%;
    border: 2px solid ${prop => prop.theme.bgColor}; 
    border-radius: 5px;
`;

const Tilte = styled.div`
    width: 100%;
    height: 5%;
    background-color: ${prop => prop.theme.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;       
    border-bottom:2px solid ${prop => prop.theme.bgColor};  
    margin-bottom: 0.5rem;
    div{
        font-size: 1.2rem;         
        margin: 0.2rem;
    }        
`;

const Infolist = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;    
    align-items: center;
    div{
        margin: 1rem;
    }
`;

const ListTh = styled.ul`
    width: 95%;
    color: ${prop => prop.theme.accentColor};
    display: flex;           
    border-bottom:2px solid ${prop => prop.theme.bgColor}; 
    margin-bottom: 0.4rem;
    span{
        display: block;
        margin-left: 1rem;
        width: 15%;
    }
    
`;

const Lists = styled.ul`
    width: 95%;
    display: flex;  
    margin-bottom: 0.4rem;
    span{
        display: block;
        margin-left: 1rem;
        width: 15%;
    }
`;

function UsersManage() {
    const { data, isLoading } = useQuery<IuUserInfo[]>("users", getUsersInfoManage,  {
        refetchInterval: 5000,
    })
    
    return (
        <Conteiner>
            {isLoading ? (
                <Loding>로딩중!!</Loding>
            ): (
                <UsersinfoConteiner>
                    <Tilte>
                        유저정보
                    </Tilte>
                    <Infolist>
                        <ListTh>
                            <span>PK</span>
                            <span>등급</span>
                            <span>아이디</span>
                            <span>로그인중</span>
                            <span>로그인아이피</span>
                            <span>로그인시간</span>
                            <span>로그아웃시간</span>
                        </ListTh>
                        { data?.map( (user) => (  
                            <Lists key={user.id}>
                                <span>{user.id}</span> 
                                <span>{user.authority}</span> 
                                <span>{user.username}</span> 
                                <span>{user.is_login?"로그인중":""}</span> 
                                <span>{user.is_login?user.login_ip:""}</span> 
                                <span>{user.login_datetime ? user.login_datetime.slice(11,19) : ""}</span> 
                                <span>{user.logout_datetime ? user.logout_datetime.slice(11,19) : ""}</span> 
                            </Lists>  
                        )) }
                    </Infolist>
                </UsersinfoConteiner>
                
            )}            
        </Conteiner>
    )
}

export default UsersManage;