import "./index.css";
import React,{useState,useEffect} from 'react';
import InputBox from "./Authentication/inputBox.tsx";
import { AddUser } from "./Restful_API.tsx";
import type { User } from "./myType.tsx";
import { useNavigate } from "react-router-dom";
export function SignupPage() {
  const [loginData,setLoginData] = useState<User>({
    username: "",
    password: ""
  });
  const [message,setMessage] = useState<string>(""); 
  //Handle create account
  const navigate = useNavigate();
  const handleUsername = (event:React.ChangeEvent<HTMLInputElement>): void =>{
    const val = event.target.value;
    console.log(val);
    setLoginData(prevLoginData => ({
      ...prevLoginData,
      username:val}));
  };
  const handlePassword = (event:React.ChangeEvent<HTMLInputElement>):void =>{
    const val = event.target.value;
    console.log(val);
    setLoginData(prevLoginData => ({
      ...prevLoginData,
      password:val}));
  };
  const CreateAccount = async()=>{
    try{
      const response = await AddUser(loginData);
      var responseTxt = await response.json();
      setMessage(responseTxt);
    }
    catch(error){
      console.error(error);
    }
  };
  //Navigate to discussion if succesffuly creating
  useEffect(()=>{
    // console.log("something");
    console.log(message);
    if(message === "Successfully creating"){
      console.log("something");
      navigate('../discussion');
    }
  },[message]);
  
  //React Component
  return (
    <div>
      <InputBox handleUsername = {handleUsername} handlePassword = {handlePassword}/>
      <button onClick =  {CreateAccount}>Create Account</button>
      <div className = "message">{message}</div>
    </div>
  );
}

export default SignupPage;
