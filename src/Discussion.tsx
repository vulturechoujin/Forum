import React, {useState, useEffect, Activity } from "react"
import  {useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
import Navbar from "./Navbar";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FullwidthBox } from "./StyledComponents";
export function Discussion() {
  const navigate = useNavigate();
  return (
<FullwidthBox>
  <Navbar hidButton={true}/>
  <Divider sx={{mt:1}}/>
  <Box sx={{display: 'flex',
      width:{
        md:450,
        lg:600
      },m:'auto'
  }}>
    <Box sx={{display:'flex',flexDirection:'column',flex: 1,p:2,gap:5}}>
      <Box
      key="movie" onClick = {(e:React.MouseEvent<HTMLDivElement>)=>{navigate("./movie")}} sx={{
        backgroundColor:'primary.light',
        '&:hover':{
          backgroundColor:'secondary.main'
        },p:1,m:1
      }}>
        <Typography variant="h5" sx={{textAlign:'center'}} >
          Movies
        </Typography>
      </Box>
        <Box
      key="comic-books-animated-movies" onClick = {(e:React.MouseEvent<HTMLDivElement>)=>{navigate("./comic")}} sx={{
        backgroundColor:'primary.light',
        '&:hover':{
          backgroundColor:'secondary.main'
        },p:1,m:1
      }}>
        <Typography variant="h5" sx={{textAlign:'center'}} >
          Comic books and animated movies
        </Typography>
      </Box>
      <Box
      key="Novels" onClick = {(e:React.MouseEvent<HTMLDivElement>)=>{navigate("./novel")}} sx={{
        backgroundColor:'primary.light',
        '&:hover':{
          backgroundColor:'secondary.main'
        },p:1,m:1
      }}>
        <Typography variant="h5" sx={{textAlign:'center'}} >
          Novels
        </Typography>
      </Box>
      <Box
      key="manga-anime" onClick = {(e:React.MouseEvent<HTMLDivElement>)=>{navigate("./manga")}} sx={{
        backgroundColor:'primary.light',
        '&:hover':{
          backgroundColor:'secondary.main'
        },p:1,m:1
      }}>
        <Typography variant="h5" sx={{textAlign:'center'}} >
          Manga-Anime
        </Typography>
      </Box>
      <Box
      key="light-novel" onClick = {(e:React.MouseEvent<HTMLDivElement>)=>{navigate("./lightnovel")}} sx={{
        backgroundColor:'primary.light',
        '&:hover':{
          backgroundColor:'secondary.main'
        },p:1,m:1
      }}>
        <Typography variant="h5" sx={{textAlign:'center'}} >
          Light Novel
        </Typography>
      </Box>
    </Box>
  </Box>
</FullwidthBox>
  )
};

export default Discussion;
