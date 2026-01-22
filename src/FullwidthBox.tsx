import React, { type PropsWithChildren } from "react"
import Box  from "@mui/material/Box";
export function FullwidthBox({children}:PropsWithChildren) {
  return (
    <Box sx={{width:'100vw', height: '100vh', display: 'flex',
         flexDirection: 'column',p:1,backgroundColor:"grey.100",
    }}>
        {children}
    </Box>  
)
};

export default FullwidthBox;
