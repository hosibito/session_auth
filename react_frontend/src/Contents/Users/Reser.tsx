import styled from "styled-components";

const LoginVerifiedConteiner = styled.div`
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

function LoginVerified() { 
    return (               
        <LoginVerifiedConteiner>
            <Tilte>
                차단된 유저입니다.
            </Tilte>
            <Infolist>
                <div>        
                    <span>관리자에 의해 차단되었습니다.</span>   
                </div>   
                <div>        
                    <span>이용이 불가능합니다.</span>  
                </div>   
                <div>        
                    <span>총판에 문의해 주세요.</span>  
                </div>                             
            </Infolist>                 
        </LoginVerifiedConteiner>   
    )
}

export default LoginVerified;