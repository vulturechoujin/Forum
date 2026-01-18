import React, {useState, useEffect, Activity } from "react"
import {redirect, useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import { Box, Divider, Stack } from "@mui/material";
import LeftTabBar from "./LeftTabBar";
import ReplyList from "./ReplyList";

export function Discussion() {
  const navigate = useNavigate();
  const navigateCreate = ()=>{
    navigate('./create');
  }
  return (
<Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',p:1,mx:1}}>
  <Navbar/>
  <Divider sx={{mt:1}}/>
  <Box sx={{ flex: 1, display: 'flex'}}>
    <LeftTabBar />
    <Divider orientation="vertical" flexItem/>
    <Box sx={{ flex: 1,p:2}}>
      <BlogList/>
    </Box>
  </Box>
</Box>
  )
};

export default Discussion;
