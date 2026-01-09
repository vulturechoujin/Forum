import React,{useState,useEffect, Activity} from 'react';
import { AddUser } from "./Restful_API.tsx";
import { theme, useAPI, useFormInput, useStatus, type Note, type User } from "./myType.tsx";
import { Form, useNavigate } from "react-router-dom";
import Message from './Message.tsx';
import { Box, Button, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Stack, ThemeProvider, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import { VisibilityOff } from '@mui/icons-material';

export function SignupPage() {
    const usernameProps = useFormInput();
    const passwordProps = useFormInput();
    const [data,execute] = useAPI(AddUser); 
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [username,isLogin,fetchData] = useStatus();
    const handleClickShowPassword = ()=>setShowPassword((show)=>!show);
    const [message,setMessage] = useState<Note>({
        value:"",
        type:""
      }
    );
    const navigate = useNavigate();
    // useEffect(
    //   ()=>{
    //     if(isLogin){
    //       navigate('/discussion');
    //     }
    //   }
    //   ,[isLogin]);
    // //Handle login
    // const handleCreate = async()=>{
    //     const loginData = {
    //       username : usernameProps.value,
    //       password : passwordProps.value
    //     };
    //     const result = await execute(loginData);
    //     const resultJSON = await result.json();
    //     if(result.ok){
    //       setMessage({
    //         value:resultJSON.message,
    //         type:"success",
    //       })
    //       setTimeout(()=>{
    //         navigate('/discussion');
    //       },1000);      
    //     }
    //     else{
    //       setMessage({
    //         value:resultJSON.error,
    //         type:"error",
    //       })
    //     }
    // };
    const [err,setErr] = useState<Error>();
  useEffect(
    ()=>{
      const handleStatus  = async()=>{
        try{
          await fetchData();
        }catch(error:unknown){
          if(!err) setErr(new Error("Unknown error occurs. Please contact us"));
          else setErr(err);
        }
      }
      handleStatus();
      if(isLogin){
        navigate('/discussion');
      }
    }
    ,[isLogin]);
  //Handle login
  const handleCreate = async()=>{
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
        },1000);      
      }
      else{
        setMessage({
          value:resultJSON.error,
          type:"error",
        })
      }
    }catch(e){
      if(!err) setErr(new Error("Unknown error occurs. Please contact us"));
      else setErr(err);
    }
  };
  if(err){
    return (<Box><Typography variant = "h5" color = "error">{err.message}</Typography></Box>)
  }

  //React Component
  return (
    // <ThemeProvider theme = {theme}>
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
        <Button onClick = {handleCreate}>Create Account</Button> 
        <Message type = {message.type} text={message.value} ></Message>
        </Box>
    // </ThemeProvider>
  );
}

export default SignupPage;
