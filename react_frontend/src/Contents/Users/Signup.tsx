import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import CSRFToken from "../../Components/CSRFToken";
import { IResult, ISignupForm, Signup_fetch } from "../../actions/auth";
import { useState } from "react";

const Conteiner = styled.div`
width: 100%;  
height: 100%; 
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
`;

const SignupConteiner = styled.div`
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

function Signup() {
    const { register , watch , handleSubmit , formState : {errors}, } = useForm<ISignupForm>();
    const [ signuperrortxt, setsignuperrortxt ]= useState("");
    let navigate = useNavigate()

    const OnValid = async(formdata:ISignupForm) => {   
        const res = await Signup_fetch(formdata)
        const result_data = res as IResult

        console.log(result_data)      
        
        if(!result_data.success){    
            setsignuperrortxt(result_data.error as string)          
        }else{    
            setsignuperrortxt(result_data.success as string)   
            
            setTimeout(()=>(navigate("/login")), 1000)
        }
    }

    return (
        <Conteiner>
        <SignupConteiner>
            <Tilte><div>회원가입</div></Tilte>
            <LoginForm onSubmit={handleSubmit(OnValid)}>
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
                <Formdiv>                    
                    <input 
                        type="password" 
                        {...register(
                            "re_password", {
                                required:  "비번이 입력되지 않았습니다.",
                                minLength: {
                                    value: 8,
                                    message: "입력된비번이 너무 짧습니다."
                                }
                            })
                        } 
                        autoComplete="current-re-password"
                        placeholder="비번을 재입력해주세요" 
                    />
                    <span>{errors?.re_password?.message}</span>
                </Formdiv>
                <span>{signuperrortxt}</span>  
            
                <Button>회원가입</Button>

                
                <span>회원정보가 이미 있습니까?</span>                   
            
                <LinkButton to={'/login'}>로그인</LinkButton>  
                
            </LoginForm>   

        </SignupConteiner>
    </Conteiner>
    )
}

export default Signup;