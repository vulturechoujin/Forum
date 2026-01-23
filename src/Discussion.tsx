import React, {useState, useEffect, Activity } from "react"
import  {useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
import Navbar from "./Navbar";
import { Box, Divider, Stack } from "@mui/material";
import { FullwidthBox } from "./MyFullwidthBox";
export function Discussion() {
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
