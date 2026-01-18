import { Stack, Typography } from "@mui/material";
import React from "react"

export function Something() {
  return (
    <div>
      <Stack spacing = {2} direction="row-reverse">
        <Typography sx={{border:1,width:100,height:50,borderRadius:1,overflow:"atuo"}}>
            I am a paragraph of text that has a few words in it.
        </Typography>
        <Typography sx={{border:1}}>
          My...
        </Typography>
        <Typography sx={{border:1}}>
          Mine...
        </Typography>
    </Stack>
    </div>
  )
};

export default Something;
