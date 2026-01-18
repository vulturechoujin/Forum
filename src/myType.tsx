import React, { use, useCallback, useEffect, useState } from 'react'
import { CheckToken, LogOut } from './Restful_API';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@sentry/browser';
import { createTheme } from '@mui/material';
//Environment variables
export const API_URL = process.env.BACKEND_URL;
//INTERFACE
export interface User{
    username:string,
    password:string
};
export interface ErrorPageProps{
  status:number,
  message:string
}
export interface Post{
    Post_Id:number,
    Post_Content:string,
    Post_Username:string
}
export interface Reply{
    Reply_Id:number,
    Post_Id:number,
    Num_Likes:number,
    Reply_Content:string,
    Reply_Username:string
}
export interface Note{
    value:string,
    type:string
}
//THEME 
//Custom Hook
export function useStatus(){
    const [username,setUsername] = useState<string>("");
    const [isLogin,setIsLogin] = useState<boolean>(false);  
    const fetchData=async()=>{
      try{
        const response = await CheckToken();
        let responseJSON;
        try{
         responseJSON = await response.json();
        }catch(err){
          throw(err);
        }
        if(response.ok){
          setIsLogin(true);
          setUsername(responseJSON);
        }
      }
      catch(error){
        if(!error){
          throw(new Error("Unknown error occurs.Please contact us"));
        }
        throw(error);
      }
    }
    return [username, isLogin,fetchData] as const;
}
export function useFormInput(){
    const [value,setValue] = useState<string>("");
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>): void =>{
        const val = event.target.value;
        console.log(val);
        setValue(val);
    };
    const inputProps = {
      value:value,
      onChange: handleChange
    }
    return inputProps;
}
export function useAPI<Targs extends any[],TResult>(asyncFn:(...args:Targs)=>Promise<Response>){
  const [data,setData] = useState<Response|null>(null);
  const execute = useCallback(async (...args:Targs) =>{
      try{
        const result = await asyncFn(...args);
        setData(result);
        return result;
      }
      catch(err:unknown){
      let newError = err
      if(!newError){
        newError = new Error("Unknown error occurs");
      } 
      throw(newError);
      }
    },
[])
  return [data,execute] as const;
}

