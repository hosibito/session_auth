import styled from "styled-components";

const RegistVerifiedConteiner = styled.div`
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

function RegistVerified() { 
    return (               
        <RegistVerifiedConteiner>
            <Tilte>
                등록승인중입니다.
            </Tilte>
            <Infolist>
                <div>        
                    <span>관리자가 회원가입을 검토중입니다. </span>   
                </div>   
                <div>        
                    <span>승인후에 사용가능합니다. </span>  
                </div>   
                <div>        
                    <span>오래걸릴경우 관리자에게 문의해주세요.</span>  
                </div>                             
            </Infolist>                 
        </RegistVerifiedConteiner>   
    )
}

export default RegistVerified;