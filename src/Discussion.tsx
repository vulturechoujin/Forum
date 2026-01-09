import React, {useState, useEffect, Activity } from "react"
import {redirect, useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
import Navbar from "./Navbar";
import { Box, Button, Grid, List, ThemeProvider } from "@mui/material";
export function Discussion() {
  const navigate = useNavigate();
  const navigateCreate = ()=>{
    navigate('./create');
  }
  return (
    <Grid container spacing = {2}>
      <Grid size = {12}>
        <Navbar/>
      </Grid>
      <Grid size ={4}>
        <Box sx={{h:'100%',position:'sticky',float:'left'}}>
        <Button variant = "contained" onClick = {navigateCreate}>+Post</Button>
        </Box>
      </Grid>
      <Grid size = {8}>
        <BlogList/>
      </Grid>
    </Grid>
  )
};

export default Discussion;
