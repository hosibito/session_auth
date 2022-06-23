import { atom, DefaultValue, selector } from "recoil";

const isLoginValue = atom({
    key: "isLoginValue",
    default: false
        
});

interface IuserProfile {
   id?:number;
   username?:string;
   authority?:string;
}

export const userProfile = atom<IuserProfile>({
    key:"userProfile" ,  
    default:{
        id:0,
        username:"",
        authority:""
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
                authority:""
            })
        }
        set(isLoginValue , newValue)
    }
});
 
