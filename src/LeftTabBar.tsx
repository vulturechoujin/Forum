import { Button, Divider, Stack } from "@mui/material";
import React from "react"

export function LeftTabBar() {
  return (
    <React.Fragment>
        <Stack direction={"column"}>
          <Button sx={{width:'max-content',lineHeight:1.2,
           alignItems:'flex-start', justifyContent:'center',
          }}>
            +Post
          </Button>
          <Divider orientation="vertical"/>
        </Stack>
    </React.Fragment>
  )
};
export default LeftTabBar;
