import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useAPI, useStatus, type Note, type Post, type Reply } from "./myType";
import { AddReply, GetPost, LikePost } from "./Restful_API";
import ReplyList from "./ReplyList";
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconAvatar } from "./IconButton";
import { ThumbUp } from "@mui/icons-material";
import { FullwidthBox } from "./MyFullwidthBox";
import { captureException } from "@sentry/browser";

export function Blog() {
    //Declare hooks
  const [username,isLogin,fetchData] = useStatus();
  const [replydata,replyexecute] = useAPI(AddReply); 
  const [postdata,postexecute] = useAPI(GetPost)
  const [likedata,incrementexecute] = useAPI(LikePost)
  const [isErr,setisErr] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [message,setMessage] = useState<Note>({
    value:"",
    type:"" 
  })
  const [post,setPost] = useState<Post>({
    Post_Content:"",
    Post_Username:"",
    Post_Id:0,
    Post_Theme:""
  })
  const {id} = useParams();
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
          if(!result.ok){
            setMessage({
              value:resultJSON.error,
              type:"error",
            })
          }
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
      if(!result.ok){
        setMessage({
          value:resultJSON.error,
          type:"error",
        })
      }
    }catch(e){
      captureException(e);
    }
  }
  const navigateFocus=(e:React.MouseEvent<HTMLButtonElement>)=>{
     document.getElementById("reply-box")?.focus()
  }
  const onLikePost = async()=>{
      try{
      const result = await incrementexecute();
      let resultJSON;
      try{
      resultJSON = await result.json();
      }catch(err){
        throw new Error("Invalid server response");
      }
      if(!result.ok){
        setMessage({
          value:resultJSON.error,
          type:"error",
        })
      }
    }catch(e){
      captureException(e);
    }
  }
  //RETURN 
  if(isErr){
    return (<Box><Typography variant = "h5" color = "error">Something has happened. Please contact us</Typography></Box>)
  }
  if(post.Post_Id===0){
    return <h2>Blog not found</h2>
  }
  return (
    <FullwidthBox>
      <Box>
        <Box sx = {{display:'flex',justifyContent:'flex-start',justifyItems:'center',
        flexDirection:'column',p:2,m:2,zIndex:10,borderRadius:2,bgcolor:'rgba(0, 0, 0, 0.04)',
        width:{ 
          xs:'75%',
          sm:500,
          md:600
        },
        }}>
        <IconAvatar username={post.Post_Username}/>
        <Typography variant ="h5" sx={{fontWeight:'Bold',lineHeight:1.4,margin:'auto'}}>
            My theme
        </Typography> 
        <Typography variant = "body2">
          {post.Post_Content}
        </Typography>
        </Box>
        <Stack direction="row">
            <IconButton name="chat-bubble" onClick = {navigateFocus}>
              <ChatBubbleIcon color="primary"/>
            </IconButton>
            <IconButton onClick={onLikePost}>
              <ThumbUpIcon color = "primary"/>
            </IconButton>
        </Stack>
      </Box>
      <Box>
        <TextField label="reply-textbox" placeholder="Please type your reply here" multiline minRows={4} maxRows={12}
        fullWidth variant="outlined" tabIndex = {-1} id ="reply-box"/>
        <Button onClick={CreateComment}>
          Add
        </Button> 
        <ReplyList post_id ={post.Post_Id}/>
      </Box>
    </FullwidthBox>
  )
};

export default Blog;
