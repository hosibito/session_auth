import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userProfile } from "../atoms/loginState";

const Conteiner = styled.div`
    width: 100%;  
    height: 100%; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

function MainContents() {
    const navigate = useNavigate()
    const userprofile = useRecoilValue(userProfile) 

    useEffect(() => {        
        if(userprofile.login_verified || !userprofile.registration_approval){
            navigate("/userinfo") 
        }
    }, [])
    return (
        <Conteiner>
        
            <h1>MainContents</h1>  
           
        </Conteiner>
    )
}
export default MainContents;