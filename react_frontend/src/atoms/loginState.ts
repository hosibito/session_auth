import { atom, DefaultValue, selector } from "recoil";

const isLoginValue = atom({
    key: "isLoginValue",
    default: false
        
});

export interface IuserProfile {
    id?:number;
    username?:string;
    authority?:string;
    login_verified?:boolean;
    registration_approval?:boolean;
}

export const userProfile = atom<IuserProfile>({
    key:"userProfile" ,  
    default:{
        id:0,
        username:"",
        authority:"",
        login_verified: false,
        registration_approval: false,
    }
})

export const isLogin = selector({
    key:'isLogin',
    get:({get}) => {
        return get(isLoginValue)
    },
    set: ({set}, newValue ) => {
        if (newValue === false){
            set(userProfile , {
                id:0,
                username:"",
                authority:"",
                login_verified: false,
                registration_approval: false,
            })
        }
        set(isLoginValue , newValue)
    }
});
 
