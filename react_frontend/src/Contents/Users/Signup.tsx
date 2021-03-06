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
            <Tilte><div>????????????</div></Tilte>
            <LoginForm onSubmit={handleSubmit(OnValid)}>
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
                <Formdiv>                    
                    <input 
                        type="password" 
                        {...register(
                            "re_password", {
                                required:  "????????? ???????????? ???????????????.",
                                minLength: {
                                    value: 8,
                                    message: "?????????????????? ?????? ????????????."
                                }
                            })
                        } 
                        autoComplete="current-re-password"
                        placeholder="????????? ?????????????????????" 
                    />
                    <span>{errors?.re_password?.message}</span>
                </Formdiv>
                <span>{signuperrortxt}</span>  
            
                <Button>????????????</Button>

                
                <span>??????????????? ?????? ?????????????</span>                   
            
                <LinkButton to={'/login'}>?????????</LinkButton>  
                
            </LoginForm>   

        </SignupConteiner>
    </Conteiner>
    )
}

export default Signup;