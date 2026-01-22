import React, {useState, useEffect, Activity } from "react"
import {redirect, useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import { Box, Divider, Stack } from "@mui/material";
import ReplyList from "./ReplyList";
import FullwidthBox from "./FullwidthBox";

export function Discussion() {
  const navigate = useNavigate();
  return (
<FullwidthBox>
  <Navbar/>
  <Divider sx={{mt:1}}/>
  <Box sx={{ flex: 1, display: 'flex'}}>
    <Box sx={{ flex: 1,p:2}}>
      <BlogList/>
    </Box>
  </Box>
</FullwidthBox>
  )
};

export default Discussion;
