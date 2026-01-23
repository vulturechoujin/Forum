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
import { LockOutline, VisibilityOff } from '@mui/icons-material';
import { Avatar, Card, CardContent, Checkbox,CircularProgress,FormControlLabel,Link} from '@mui/material';
import { FullwidthBox, FullwidthBoxCenter } from './MyFullwidthBox.tsx';
import { captureException } from '@sentry/browser';
export function LoginPage() {
  const usernameProps = useFormInput();
  const passwordProps = useFormInput();
  const [checked, setChecked] = useState(true);
  const [data,execute] = useAPI(VerifyUser); 
  const [showPassword,setShowPassword]=useState<boolean>(false);
  const [username,isLogin,fetchData] = useStatus();
  const handleClickShowPassword = ()=>setShowPassword((show)=>!show);
  const [message,setMessage] = useState<Note>({
      value:"",
      type:""
    }
  );
  //Img
  const [load,setLoad] = useState<boolean>(false);
  const [locationImg, setLocationImg] = useState(null);
  const [isErr,setisErr] = useState<Boolean>(false);
  const navigate = useNavigate();
  //Front end handling
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
  const handleLogin = async()=>{
    setLoad(true);
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
  //React Component
  return (
    <FullwidthBoxCenter>
        <Card sx={{width:'100%',maxWidth:390, minHeight: { xs: 460, sm: 520 },
        borderRadius:2,boxShadow:3}}>
        <CardContent sx={{p:{
          xs:3,sm:4    
        }, }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, }}>
            <Avatar sx={{ bgcolor: "primary.main",
               width:{
                xs:48,sm:56
               }, height: {
                xs:48,sm:56
               } }}>
              <LockOutline />
            </Avatar>
          </Box>
          <Typography align="center" variant="h5" sx={{
            fontWeight:'fontWeightBold'
          }}>
            Sign in
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
            <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              mt: 1,
              gap: 1,
            }}
          >
            <FormControlLabel
              control={<Checkbox
          checked={checked}
          onChange={handleChange}
          slotProps={{
          input: { 'aria-label': 'controlled' },
          }}
          />  }
              label="Remember me"
            />    
            <Link href="#" underline="none">
              Forgot password?
            </Link>
          </Box>     
          <Button fullWidth variant="contained"
          size="large" onClick = {handleLogin}>Sign in</Button>
          <Activity mode = {load?'visible':'hidden'}>
            <CircularProgress/>
          </Activity>
          <Message type = {message.type} text={message.value} ></Message>
        </CardContent>
        </Card>
    </FullwidthBoxCenter>
  );
};

export default LoginPage;
