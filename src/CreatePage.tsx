import React,{useState,useEffect} from "react"
import { AddPost, CheckToken } from "./Restful_API";
import { useNavigate, useParams } from "react-router-dom";
import { useAPI, useStatus, type Note, type Post } from "./myType";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Message from "./Message";
import Navbar from "./Navbar";
import { FullwidthBox} from "./StyledComponents";
import { captureException } from "@sentry/browser";
import { BlogNotFound } from "./ErrorPage";
export function CreatePage() {
  const [message,setMessage] = useState<Note>({
    value:"",
    type:""
  }
  ); 
  const navigate = useNavigate();
  const [data,execute] = useAPI(AddPost); 
  const [username,isLogin,fetchData] = useStatus();
  const [isErr,setisErr] = useState<Boolean>(false);
  const params = useParams();
  const topic = params.topic;
  if(!isLogin){
    navigate('/login');
  }
  if(!topic){
    setTimeout(()=>navigate("/"),1000);
    return <BlogNotFound/>
  }
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
    }
    ,[isLogin]);
  const CreatePost = async()=>{
      const data1 = (document.getElementById('create-content') as HTMLInputElement).value;
      const data2 = (document.getElementById('create-theme') as HTMLInputElement).value;
      try{
      let newPost:Post = {
        Post_Id:0,
        Post_Content:data1,
        Post_Username:username,
        Post_Theme:data2,
        Post_Topic:topic,
        Num_Likes:0
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
          navigate('/');
        },1000);      
      }
      else{
        setMessage({
          value:resultJSON.error,
          type:"error",
        })
      }
    }catch(e){
          captureException(e);
          setisErr(true);
    }
  }
  if(isErr){
    return (<Box><Typography variant = "h5" color = "error"></Typography></Box>)
  }
    return (
      <FullwidthBox>
        <Navbar hidButton/>
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
          }}} label = "Theme" name = "create-post" id = "create-theme" 
          multiline />
          <TextField sx={{
            width:{
            'md':500,
            'lg':600,
            'xl':700
            },
            mx:'auto'
          }}label = "Content" name = "create-post" id = "create-content" rows={3} 
          multiline/>
          <Button sx={{width:'max-content',mx:'auto'}}onClick={CreatePost}>Create Post</Button>
          <Message type = {message.type} text={message.value}></Message>
        </Box>
      </FullwidthBox>
  )
};

export default CreatePage;
