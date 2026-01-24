import { Box, Typography } from "@mui/material";
import React from "react"

export function ErrorPage() {
  return (
 <Box><Typography variant = "h5" color = "error">Something has happened. Please contact us</Typography></Box>)
};

export function BlogNotFound(){
    return (<Typography variant="h5" color = "error">Blog not found</Typography>)
}