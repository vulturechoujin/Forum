import { Typography } from "@mui/material";
import React from "react"

export function Message({type,text}:{type:string,text:string}) {
  return (
    <div>
      <Typography color = {type}>{text}</Typography>
    </div>
  )
};

export default Message;
