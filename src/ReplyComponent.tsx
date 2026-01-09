import React from "react"
import type { Reply } from "./myType";

export function ReplyComponent({reply}:{reply:Reply}) {
  return (
    <div>
        <h2>{reply.Reply_Username}</h2>
        <h2>{reply.Reply_Content}</h2>
    </div>
  )
};

export default ReplyComponent;
