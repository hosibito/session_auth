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

    // submit 더블클릭 방지  
    const onClick = (formdata:IloginForm) =>{    
        if(!isSubmitClick){
            setisSubmitClick(true)
            OnValid2(formdata)
        }    
    }
    
    // 로그인 REST 처리 방법 1 ( 직접처리)
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

    // 로그인 REST 처리 2 (Login_fetch 함수) 현제는 이거 사용!!
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
                authority:userinfo.authority
            }
    
            setuserprofile(recoil_userprofiledata)    
            // console.log(res)
    
            navigate("/")
        }
    }
    
    // 로그인 REST 처리 3 (Login_axios 함수)
    const OnValid3 = async(formdata:IloginForm) =>{
        const res = await Login_axios(formdata)  
        console.log(res)   
        const result_data = res.data as IResult
        console.log(result_data)
    }    
 
    return (                
        <Conteiner>
            <LoginConteiner>
                <Tilte><div>로그인</div></Tilte>
                <LoginForm onSubmit={handleSubmit(onClick)}>
                    <CSRFToken/>
                
                    <Formdiv>                    
                        <input 
                            {...register(
                                "username", {
                                    required: "아이디가 입력되지 않았습니다.",
                                    minLength: {
                                        value: 8,
                                        message: "아이디는 8자 이상입니다."
                                    }
                                })
                            }        
                            autoComplete="username"             
                            placeholder="아이디를 입력하세요" 
                        />
                        <span>{errors?.username?.message}</span>
                    </Formdiv>
                    <Formdiv>                    
                        <input 
                            type="password" 
                            {...register(
                                "password", {
                                    required:  "비번이 입력되지 않았습니다.",
                                    minLength: {
                                        value: 8,
                                        message: "입력된비번이 너무 짧습니다."
                                    }
                                })
                            } 
                            autoComplete="current-password"
                            placeholder="비번을 입력하세요" 
                        />
                        <span>{errors?.password?.message}</span>
                    </Formdiv>

                    <span>{loginerrortxt}</span>    
                    <Button>로그인</Button>    

                    
                    <span>아이디 비번이 없나요?</span>                   
                
                    <LinkButton to={'/signup'}>회원가입</LinkButton>  
                    
                </LoginForm>   

            </LoginConteiner>
        </Conteiner>
    )
}

export default Login;