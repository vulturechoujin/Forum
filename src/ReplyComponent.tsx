import React from "react"
import type { Reply } from "./myType";
import { Box, IconButton, Typography } from "@mui/material";
import { IconAvatar } from "./IconButton";

export function ReplyComponent({reply}:{reply:Reply}) {
  return (
    <Box>
        <Box>
          <IconAvatar username = {reply.Reply_Username}/>
          <Typography>
            {reply.Reply_Content}
          </Typography>
        </Box>
    </Box>
  )
};

export default ReplyComponent;
