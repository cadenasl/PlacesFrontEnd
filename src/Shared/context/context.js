import { createContext } from "react";


 const AuthContext=createContext({isAuth:false,userId:"",token:null,isLoggedIn:(userId,token)=>{},isLoggedout:()=>{}})




 export default AuthContext