import React, { useEffect, useState } from "react"
import type { Reply } from "./myType";
import { RenderReplies } from "./Restful_API";
import { ReplyComponent } from "./ReplyComponent";
import { useNavigate } from "react-router-dom";

export function ReplyList({post_id}:{post_id:number}) {
  const [replies,setReplies] = useState<Reply[]>([])
  const navigate = useNavigate()
  const handleList = async()=>{
      try{
        const response = await RenderReplies(post_id);
        const Replies = await response.json();
                
        setReplies(Replies);    
        // console.log(Posts);
      }      
      catch(err){
        
      }
    } 
    useEffect(()=>{
      handleList();
    }
    ,[])
  return (
    <div>
      {replies.map((reply:Reply)=>
      (
        <section key={reply.Reply_Id} className="comment-box">
          <ReplyComponent reply ={reply}/>  
        </section>
      ))}
    </div>
  )
};

export default ReplyList;
