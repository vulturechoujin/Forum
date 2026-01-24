import React, { type PropsWithChildren } from "react"
import Box  from "@mui/material/Box";
export function FullwidthBox({children}:PropsWithChildren) {
  return (
    <Box sx={{width:'100vw', height: '100vh', display: 'flex',
        flexDirection: 'column',p:1,backgroundColor:"grey.100",
        overflow:'auto'
    }}>
        {children}
    </Box>  
)
};
export function FullwidthBoxCenter({children}:PropsWithChildren) {
  return (
<Box
  sx={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "grey.100",
    overflow:'auto',
    p: 1,              
  }}>
{children}
</Box>
  )}
