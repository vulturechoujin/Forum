import React,{useState,useEffect, Activity} from 'react';
import { AddUser } from "./Restful_API.tsx";
import { useAPI, useFormInput, useStatus, type Note, type User } from "./myType.tsx";
import { Form, useNavigate } from "react-router-dom";
import Message from './Message.tsx';
import  Box  from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff  from '@mui/icons-material/VisibilityOff';
import { FullwidthBoxCenter } from './MyFullwidthBox.tsx';
import Navbar from './Navbar.tsx';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { Avatar, Card, CardContent, Checkbox, Divider, FormControlLabel, Link } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, type BorderColor } from '@mui/icons-material';
import { captureException } from '@sentry/browser';

export function SignupPage() {
    const usernameProps = useFormInput();
    const passwordProps = useFormInput();
    const [data,execute] = useAPI(AddUser); 
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [checked, setChecked] = useState(true);
    const [username,isLogin,fetchData] = useStatus();
    const handleClickShowPassword = ()=>setShowPassword((show)=>!show);
    const [message,setMessage] = useState<Note>({
        value:"",
        type:""
      }
    );
    const [isErr,setisErr] = useState<Boolean>(false);
    const navigate = useNavigate();
    useEffect(
    ()=>{
      const handleStatus  = async()=>{
        try{
          await fetchData();
        }catch(error:unknown){
          captureException(error);
          setisErr(true);
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
          navigate('/login');
        },100);      
      }
      else{
        setMessage({
          value:resultJSON.error,
          type:"error",
        })
      }
    }catch(e:unknown){
      captureException(e);
      setisErr(true);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  if(isErr){
    return (<Box><Typography variant = "h5" color = "error">Something has happened. Please contact us.</Typography></Box>)
  }
  return (
    <FullwidthBoxCenter>
      <Card sx={{width:'100%',maxWidth:390, minHeight: { xs: 460, sm: 520 },borderRadius:2,boxShadow:3}}>
        <CardContent sx={{p:{
          xs:3,sm:4    
        },py:'auto' }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, }}>
            <Avatar sx={{ bgcolor: "primary.main",
               width:{
                xs:48,sm:56
               }, height: {
                xs:48,sm:56
               } }}>
              <LockOutlineIcon />
            </Avatar>
          </Box>
          <Typography align="center" variant="h5" sx={{
            fontWeight:'fontWeightBold'
          }}>
            Sign Up
          </Typography>
                    <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Enter your credentials to continue
          </Typography>
            <Box sx={{
              backgroundColor:'white'}}> 
              <FormControl variant = "standard" fullWidth sx={{mb:2}}>
                <InputLabel htmlFor = "standard-adornment-username">Username</InputLabel>
                <Input sx={{minWidth:0}} id = "standard-adornment-username" type = "text" {...usernameProps}/>
              </FormControl>
              <FormControl fullWidth  variant = "standard"
              sx={{mb:2}}>
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
          </Box>
          <Button fullWidth variant="contained"
          size="large" onClick = {handleCreate}>Create Account</Button>
                    <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography sx={{ mx: 2 }} color="text.secondary">
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>
          <Typography align="center" variant="body2">
           Sign up with gmail
          </Typography>
          <Message type = {message.type} text={message.value} ></Message>
        </CardContent>
    </Card>
    </FullwidthBoxCenter>
    // </ThemeProvider>
  );
}

export default SignupPage;
