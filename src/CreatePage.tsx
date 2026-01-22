import React,{useState,useEffect} from "react"
import { AddPost, CheckToken } from "./Restful_API";
import { useNavigate } from "react-router-dom";
import { useAPI, useStatus, type Note, type Post } from "./myType";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Message from "./Message";
import Navbar from "./Navbar";
import FullwidthBox from "./FullwidthBox";
export function CreatePage() {
  const [message,setMessage] = useState<Note>({
    value:"",
    type:""
  }
  ); 
  const navigate = useNavigate();
  const [data,execute] = useAPI(AddPost); 
  const [username,isLogin,fetchData] = useStatus();
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
    }
    ,[isLogin]);
  const CreatePost = async()=>{
      const data = (document.getElementById('create-post') as HTMLInputElement).value;
      console.log(data);
      try{
      let newPost:Post = {
        Post_Id:0,
        Post_Content:data,
        Post_Username:username
      }
      const result = await execute(newPost);
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
  }
  // if(err){
  //   return (<Box><Typography variant = "h5" color = "error">{err.message}</Typography></Box>)
  // }
    return (
      <FullwidthBox>
        <Navbar/>
        <Box sx={{width:'inherit',height:'inherit',
          backgroundColor:'white',
          display:'flex',
          flexDirection:'column',alignContent:'center',justifyContent:'center'}}>
          <Typography sx={{my:1,textAlign:'center',fontSize:20}}>
            Create a blog post
          </Typography>
          <TextField sx={{mb:2,mx:'auto',width:{
            'xs':'80%',
            'sm':'80%',
            'md':400,
            'lg':800,
            'xl':800
          }}} label = "Theme" name = "create-post" id = "create-post" 
          multiline />
          <TextField sx={{
            width:{
            'md':500,
            'lg':600,
            'xl':700
            },
            mx:'auto'
          }}label = "Content" name = "create-post" id = "create-post" rows={3} 
          multiline/>
          <Button sx={{width:'max-content',mx:'auto'}}onClick={CreatePost}>Create Post</Button>
          <Message type = {message.type} text={message.value}></Message>
        </Box>
      </FullwidthBox>
  )
};

export default CreatePage;
