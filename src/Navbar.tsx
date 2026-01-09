import React, { Activity } from "react"
import { useAPI, useStatus } from "./myType";
import { useNavigate } from "react-router-dom";
import { LogOut } from "./Restful_API";
import { Button } from "@mui/material";
export function Navbar() {
  const [username,isLogin] = useStatus();
  const [data,execute] = useAPI(LogOut);
  const navigate = useNavigate();
  const navigateLogin = ()=>{
    navigate('../login');
  }
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
    <div>
        <Activity mode = {isLogin?'visible':'hidden'}>
            <h6>{username}</h6>
            <Button variant = "contained" onClick={handleLogOut}>Logout</Button>
        </Activity>
        <Activity mode = {isLogin?'hidden':'visible'}>
            <Button variant = "contained" onClick={navigateLogin}>Login</Button>
        </Activity> 
    </div>
  )
};

export default Navbar;
