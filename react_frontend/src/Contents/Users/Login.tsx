import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Login_fetch, Login_axios, IloginForm, getUserInfo, IuUserInfo, IResult} from "../../actions/auth";

import CSRFToken from "../../Components/CSRFToken";
import Cookies from 'js-cookie';
import styled from "styled-components";
import {  useSetRecoilState } from "recoil";
import { isLogin, userProfile } from "../../atoms/loginState";
import { useState } from "react";

const Conteiner = styled.div`
    width: 100%;  
    height: 100%; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const LoginConteiner = styled.div`
    width: 40%;
    height: 70%;
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

const LoginForm = styled.form`
    width: 100%;  
    height: 90%;   
    margin-top: 1rem;
    display: flex;
    flex-direction: column;   
    align-items: center; 

   
`;

const Button = styled.button`

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;   
    margin-top: 1rem;
    height: 10%;
    width: 90%;
    background-color: ${prop => prop.theme.bgColor};
    color:${prop => prop.theme.accentColor};
    font-size: 1.2rem;
    border: none;
    border-radius: 10px;
    margin-bottom: 3rem;        
    
    :active{
        opacity:0.7;
    } 
    :hover{
        font-size: 1.5rem;
    } 
`;

const LinkButton = styled(Link)`
    text-decoration-line: none;
    text-decoration : none;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 1rem;
    height: 10%;
    width: 90%;
    background-color: ${prop => prop.theme.bgColor};
    color:${prop => prop.theme.accentColor};
    font-size: 1.2rem;
    border: none;
    border-radius: 10px;
    margin-bottom: 3rem;        
    
    :active{
        opacity:0.7;
    } 
    :hover{
        font-size: 1.5rem;
    } 
`;

const Formdiv = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;

    
    input{     
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;   
        background-color: ${prop => prop.theme.inputColor};
        border: 2px solid ${prop => prop.theme.bgColor};
        border-radius: 10px;
        height: 3rem;
        width: 90%;
        font-size: 1.5rem;
        padding: 5px;
    }
    span{
        height: 20%;
        font-size: 1rem;
        display: flex;
        align-items: center;    
    }
`;

function Login() {
    const { register , watch , handleSubmit , formState : {errors}, } = useForm<IloginForm>();
    const setIsLogin = useSetRecoilState(isLogin)
    const setuserprofile = useSetRecoilState(userProfile)
    const [ loginerrortxt, setloginerrortxt ]= useState("");
    const [isSubmitClick, setisSubmitClick] = useState(false);
    let navigate = useNavigate()

    // submit ???????????? ??????  
    const onClick = (formdata:IloginForm) =>{    
        if(!isSubmitClick){
            setisSubmitClick(true)
            OnValid2(formdata)
        }    
    }
    
    // ????????? REST ?????? ?????? 1 ( ????????????)
    const OnValid1 = async(formdata:IloginForm) =>{
        const res = await fetch("/api/session_auth_v1/users/login" , {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') as string
            },
            body: JSON.stringify(formdata)
        }).then(reponse => reponse.json())    
    }

    // ????????? REST ?????? 2 (Login_fetch ??????) ????????? ?????? ??????!!
    const OnValid2 = async(formdata:IloginForm) =>{
        const res = await Login_fetch(formdata)     
        const result_data = res as IResult
        console.log(result_data)  
            
        if(!result_data.success){          
            setloginerrortxt(result_data.error as string)  
            setTimeout( ()=>{setisSubmitClick(false) } , 2000)    
        }else{
            setIsLogin(true)     
    
            const userinfo = await getUserInfo() as IuUserInfo    
            const recoil_userprofiledata = {
                id:userinfo.id,
                username:userinfo.username,
                authority:userinfo.authority,
                login_verified: userinfo.login_verified,
                registration_approval: userinfo.registration_approval,
            }
    
            setuserprofile(recoil_userprofiledata)    
            // console.log(res)
            navigate("/userinfo")
         
        }
    }
    
    // ????????? REST ?????? 3 (Login_axios ??????)
    const OnValid3 = async(formdata:IloginForm) =>{
        const res = await Login_axios(formdata)  
        console.log(res)   
        const result_data = res.data as IResult
        console.log(result_data)
    }    
 
    return (                
        <Conteiner>
            <LoginConteiner>
                <Tilte><div>?????????</div></Tilte>
                <LoginForm onSubmit={handleSubmit(onClick)}>
                    <CSRFToken/>
                
                    <Formdiv>                    
                        <input 
                            {...register(
                                "username", {
                                    required: "???????????? ???????????? ???????????????.",
                                    minLength: {
                                        value: 8,
                                        message: "???????????? 8??? ???????????????."
                                    }
                                })
                            }        
                            autoComplete="username"             
                            placeholder="???????????? ???????????????" 
                        />
                        <span>{errors?.username?.message}</span>
                    </Formdiv>
                    <Formdiv>                    
                        <input 
                            type="password" 
                            {...register(
                                "password", {
                                    required:  "????????? ???????????? ???????????????.",
                                    minLength: {
                                        value: 8,
                                        message: "?????????????????? ?????? ????????????."
                                    }
                                })
                            } 
                            autoComplete="current-password"
                            placeholder="????????? ???????????????" 
                        />
                        <span>{errors?.password?.message}</span>
                    </Formdiv>

                    <span>{loginerrortxt}</span>    
                    <Button>?????????</Button>    

                    
                    <span>????????? ????????? ??????????</span>                   
                
                    <LinkButton to={'/signup'}>????????????</LinkButton>  
                    
                </LoginForm>   

            </LoginConteiner>
        </Conteiner>
    )
}

export default Login;