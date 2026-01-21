import React,{useState,useEffect, Activity} from 'react';
import { VerifyUser } from "./Restful_API.tsx";
import { useAPI, useFormInput, useStatus, type Note, type User } from "./myType.tsx";
import { useNavigate } from "react-router-dom";
import Message from './Message.tsx';
import Box  from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import  IconButton from '@mui/material/IconButton';
import  InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import  Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import { VisibilityOff } from '@mui/icons-material';
export function LoginPage() {
  const usernameProps = useFormInput();
  const passwordProps = useFormInput();
  const [data,execute] = useAPI(VerifyUser); 
  const [showPassword,setShowPassword]=useState<boolean>(false);
  const [username,isLogin,fetchData] = useStatus();
  const handleClickShowPassword = ()=>setShowPassword((show)=>!show);
  const [message,setMessage] = useState<Note>({
      value:"",
      type:""
    }
  );
  const [err,setErr] = useState<Error>();
  const navigate = useNavigate();
  useEffect(
    ()=>{
      const handleStatus  = async()=>{
        try{
          await fetchData();
        }catch(error:unknown){
          if(error instanceof Error) setErr(err);
          else setErr(new Error("Unknown error occurs. Please contact us"));
        }
      }
      handleStatus();
      if(isLogin){
        navigate('/discussion');
      }
    }
    ,[isLogin]);
  //Handle login
  const handleLogin = async()=>{
    try{
      const loginData = {
        username : usernameProps.value,
        password : passwordProps.value
      };
      const result = await execute(loginData);
      let resultJSON;
      try{
      resultJSON = await result.json();
      }catch(err){
        throw new Error("Invalid server response");
      }
      if(result.ok){
        setMessage({
          value:resultJSON.message,
          type:"success",
        })
        setTimeout(()=>{
          navigate('/discussion');
        },100);      
      }
      else{
        setMessage({
          value:resultJSON.error,
          type:"error",
        })
      }
    }catch(e:unknown){
      if(e instanceof Error) setErr(e);
      else setErr(new Error("Unknown error occurs. Please contact us"));
    }
  };
  if(err){
    return (<Box><Typography variant = "h5" color = "error">{err.message}</Typography></Box>)
  }
  //React Component
  return (
    // <ThemeProvider theme = {theme}>
        <div>
        <Box sx = {{p:2,border:'1px solid black',zIndex:1,boxShadow:1}} >
          <Stack direction = "column" spacing = {2}> 
            <FormControl sx={{ m: 1, width: '25ch' }}  variant = "standard">
              <InputLabel htmlFor = "standard-adornment-username">Username</InputLabel>
              <Input id = "standard-adornment-username" type = "text" {...usernameProps}/>
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}  variant = "standard">
              <InputLabel htmlFor = "password">Password</InputLabel>
              <Input type ={showPassword?'text':'password'} id="password"
              {...passwordProps}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                  aria-label={showPassword?'hide the password':'display the password'}
                  onClick={handleClickShowPassword}
                  edge = "end">
                    {showPassword?<VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              } required></Input>
            </FormControl>
        </Stack>
        <Button onClick = {handleLogin}>Login</Button> 
        <Message type = {message.type} text={message.value} ></Message>
        </Box>
        </div>
    // </ThemeProvider>
  );
};

export default LoginPage;
