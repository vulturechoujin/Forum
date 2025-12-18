import "./index.css";
import React,{useState} from 'react';
import InputBox from "./Authentication/inputBox.tsx";
import CreateUser from "./Restful_API.tsx";
import {BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import type { User } from "./myType.tsx";
export function App() {
  const [loginData,setLoginData] = useState<User>({
    username: "",
    password: ""
  });
  const [message,setMessage] = useState<string>("");
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
  const handleCreate = async()=>{
    try{
      const response = await CreateUser(loginData);
      var responseTxt = await response.text();
      setMessage(responseTxt);
    }
    catch(error){
      console.error(error);
    }
  };
  // const myAccount:User={
  //   username:"vulturechoujin",
  //   password:"password"
  // };
  
  return (
    <div>
      <InputBox handleUsername = {handleUsername} handlePassword = {handlePassword}/>
      <button onClick =  {handleCreate}>Create Account</button>
      <div className = "message">{message}</div>
    </div>

  );
}

export default App;
