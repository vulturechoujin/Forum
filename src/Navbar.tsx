import React, { Activity, useEffect, useState } from "react"
import { useAPI, useStatus } from "./myType";
import { useNavigate } from "react-router-dom";
import { LogOut } from "./Restful_API";
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { StickyNote2 } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
export function Navbar() {
  const [username,isLogin,fetchData] = useStatus();
  const [data,execute] = useAPI(LogOut);
  const [err,setErr] = useState<Error>()
  const navigate = useNavigate();
  const navigateLogin = ()=>{
    navigate('../login');
  }
  const navigateCreate = ()=>{
    navigate('./create')
  }
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
    }
    ,[isLogin]);
  const handleLogOut = async()=>{
      try{
        const response =await execute();
        if(response.ok){
          navigate('/login');   
        }
        else{
          throw(new Error("Unknown error occurs. Please contact us."));
        }
      } catch(err){
         console.error(err);
      } 
  }
  return (
    <Box sx={{
      width:'inherit',
      display:'flex',
      flexDirection:'row',
      gap:2,
      p:2
    }}>
        <Typography variant="h6" sx={{flexGrow:1}}>
          MyForum
        </Typography>
        <Button onClick={navigateCreate}
            startIcon={<AddIcon/>}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
            }}
          >
            Add Post
        </Button>
        <Activity mode = {isLogin?'visible':'hidden'}>
        <IconButton
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {username}
          </Typography>
        </IconButton>
        <Button
          variant="contained"
          onClick={handleLogOut}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Logout
        </Button>
      </Activity>
      <Activity mode = {isLogin?'hidden':'visible'}>
        <Button
          variant="contained"
          onClick={navigateLogin}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Login
        </Button>
      </Activity>
    </Box>
  )
};

export default Navbar;
