import React, { useEffect, useState } from "react"
import { useAPI, type Note, type Reply } from "./myType";
import { LikeReply, RenderReplies } from "./Restful_API";
import { ReplyComponent } from "./ReplyComponent";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { captureException } from "@sentry/browser";

export function ReplyList({post_id}:{post_id:number}) {
  const [data,execute] = useAPI(RenderReplies)
  const [likedata,incrementexecute] = useAPI(LikeReply)
  const [replies,setReplies] = useState<Reply[]>([]);
  const [message,setMessage] = useState<Note>(
    {
      value:"",type:"",
    }
  )
  const [isErr,setisErr] = useState<Boolean>(false);
  useEffect(()=>{
    const handleList = async()=>{
      try{
        const result = await execute(post_id);
        let resultJSON;
        try{
        resultJSON = await result.json();
        }catch(err){
          throw new Error("Invalid server response");
        }
        setReplies(resultJSON);
        if(result.ok){
          setMessage({
            value:resultJSON.message,
            type:"success",
          })
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
    handleList(); 
  },[])
  const onLikeReply= async (Reply_Id:number)=>{
      setReplies(prev=>prev.map(r=>
        r.Reply_Id === Reply_Id?
        {...r,Num_Likes:r.Num_Likes+1}:r
      ))  
      try{
        const result = await incrementexecute(Reply_Id);
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
          setisErr(true);
      } 
    }
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:2,justifyContent:'center',alignItems:'center'}}>
      {replies.map((reply:Reply)=>
      (
        <Box key={reply.Reply_Id}>
          <ReplyComponent reply ={reply}/>
          <IconButton onClick={()=>onLikeReply(reply.Reply_Id)}>
            <ThumbUp color = "primary"/>
          </IconButton>
          <Typography sx={{display:"inline-block"}}>
            {reply.Num_Likes}  
          </Typography>
        </Box>
      ))}
    </Box>
  )
};

export default ReplyList;
