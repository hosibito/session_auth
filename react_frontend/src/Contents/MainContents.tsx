import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IuserProfile, userProfile } from "../atoms/loginState";
import LoginVerified from "./Users/LoginVerified";

const Conteiner = styled.div`
    width: 100%;  
    height: 100%; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

function MainContents() {
    const userprofile = useRecoilValue(userProfile)    
    
    return (
        <Conteiner>
            {
                !(userprofile.registration_approval || userprofile.login_verified) ? (
                    
                    userprofile.login_verified ? (<LoginVerified/>)  :(<h1>dadsf</h1>)                    
                                       
                ):(
                    
                    <h1>MainContents</h1>  
                )
            }   
        </Conteiner>
    )
}

export default MainContents;