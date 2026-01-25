import React from "react"
import { FullwidthBox } from "./StyledComponents"
import Navbar from "./Navbar"
import BlogList from "./BlogList"
import { Box, Divider } from "@mui/material"
import { useParams } from "react-router-dom"
import { list_topics } from "./myType"
import { BlogNotFound } from "./ErrorPage"

export function TopicDiscussion() {
    const params = useParams();
    const topic = params.topic;
    if(!topic || !list_topics.includes(topic)){
    return <BlogNotFound/>
    }
  return (
     <FullwidthBox>
        <Navbar hidButton={false}/>
        <Divider sx={{mt:1}}/>
        <Box sx={{flex:1,display:'flex'}}>
            <Box sx={{flex:1,p:2}}>
                <BlogList topic = {topic}/>
            </Box>
        </Box>
     </FullwidthBox>
  )
};

export default TopicDiscussion;
