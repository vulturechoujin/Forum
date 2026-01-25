import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useAPI, useStatus, type Note, type Post, type Reply } from "./myType";
import { AddReply, GetPost, LikePost } from "./Restful_API";
import ReplyList from "./ReplyList";
import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconAvatar } from "./IconButton";
import { ThumbUp } from "@mui/icons-material";
import { FullwidthBox, FullwidthBoxCenter } from "./StyledComponents";
import { captureException } from "@sentry/browser";
import { BlogNotFound, ErrorPage } from "./ErrorPage";
import Navbar from "./Navbar";

export function Blog() {
    //Declare hooks
  const [username,isLogin,fetchData] = useStatus();
  const [replydata,replyexecute] = useAPI(AddReply); 
  const [postdata,postexecute] = useAPI(GetPost)
  const [likedata,incrementexecute] = useAPI(LikePost)
  const [isErr,setisErr] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [post,setPost] = useState<Post>({
    Post_Content:"",
    Post_Username:"",
    Post_Id:0,
    Post_Theme:"",
    Post_Topic:"",
    Num_Likes:0
  })
  const [inputError,setinputError] = useState<Boolean>(false);
  const params= useParams();
  const id = params.post_id;
  if(id === undefined){
    return <h2>Invalid</h2>
  }
  //function
  useEffect(
    ()=>{
      const handleStatus  = async()=>{
        try{
          await fetchData();
          const result = await postexecute(id);
          let resultJSON;
          try{
          resultJSON = await result.json();
          setPost(resultJSON);
          }catch(err){
            throw new Error("Invalid server response");
          }
          console.log(resultJSON);
        }catch(err:unknown){
          captureException(err);
          setisErr(true);
        }
      }
      handleStatus();
    }
    ,[isLogin]);
  const CreateComment=async()=>{
    if(!isLogin){
      navigate('/login');
    }
    const data = (document.getElementById('reply-box') as HTMLInputElement).value;
    if(data==""){
      setinputError(true);
    }
    else{
      setinputError(false);
    }
    try{
    let newComment:Reply = {
      Reply_Id:0,
      Post_Id:post.Post_Id,
      Reply_Content:data,
      Reply_Username:username,
      Num_Likes:0
    }
      const result = await replyexecute(newComment);
      let resultJSON;
      try{
      resultJSON = await result.json();
      }catch(err){
        throw new Error("Invalid server response");
      }
      const box = document.getElementById('reply-box') as HTMLInputElement;
      box.value = ""
    }catch(e){
      captureException(e);
    }
  }
  const navigateFocus=(e:React.MouseEvent<HTMLButtonElement>)=>{
     document.getElementById("reply-box")?.focus()
  }
  const onLikePost = async()=>{
      setPost(prev=>{return {
        ...prev,
        Num_Likes:prev.Num_Likes+1,}}
      )  
      try{
      const result = await incrementexecute(post.Post_Id);
      let resultJSON;
      try{
      resultJSON = await result.json();
      }catch(err){
        throw new Error("Invalid server response");
      }
    }catch(e){
      captureException(e);
    }
  }
  //RETURN 
  if(isErr){
    return(<ErrorPage/>)
  }
  if(post.Post_Id===0){
    return (<BlogNotFound/>)
  }
  return (
    <FullwidthBox>
      <Navbar hidButton = {true}/>
      <Box sx={{display:'flex',justifyContent:'center',justifyItems:'center',alignItems:'center'}}>
        <Box sx = {{display:'flex',justifyContent:'flex-start',
        flexDirection:'column',p:2,my:2,zIndex:10,borderRadius: 2,bgcolor:'rgba(0, 0, 0, 0.04)',
        width:{ 
          xs:'75%',
          sm:500,
          md:600
        },
        }}>
        <IconAvatar username={post.Post_Username}/>
        <Typography variant ="h5" sx={{fontWeight:'Bold',lineHeight:1.4,margin:'auto'}}>
            {post.Post_Theme}
        </Typography> 
        <Typography variant = "body2">
          {post.Post_Content}
        </Typography>
            <Box sx={{display:'flex',flexDirection:'row',ml:'auto',alignItems:'center '}}>
              <IconButton name="chat-bubble" onClick = {navigateFocus}>
                <ChatBubbleIcon color="primary"/>
              </IconButton>
              <IconButton onClick={onLikePost} >
                <ThumbUpIcon color = "primary"/>
              </IconButton>
              <Typography sx={{display:"inline-block",fontWeight:'fontWeightBold'}}>{post.Num_Likes}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
      <Box sx={{display:'flex',flexDirection:'column'}}>
          <TextField label="reply-textbox" placeholder="Please type your reply here" 
          multiline minRows={4} maxRows={12}
          fullWidth variant="outlined" tabIndex = {-1} id ="reply-box"
            helperText={inputError ? "Title is required" : ""}
           />
      <Button onClick={CreateComment} sx={{
        width:{
          xs:'auto',
          sm:'100%',
          md:'50%'
        },my:1,mx:'auto'
      }}>
        Add
      </Button>
      </Box>
      <Divider/>
      <ReplyList post_id = {post.Post_Id}/>
      </Box>
    </FullwidthBox>
  )
};

export default Blog;
