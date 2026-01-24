import React,{useEffect, useState} from "react"
import { RenderPost } from "./Restful_API";
import type { Post } from "./myType";
import { useNavigate } from 'react-router-dom'
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { IconAvatar } from "./IconButton";
import { captureException } from "@sentry/browser";
export function BlogList() {
  const [posts,setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const [isErr,setisErr] = useState<Boolean>(false);
  const handleList = async()=>{
    try{
      const response = await RenderPost();
      const Posts = await response.json();
      setPosts(Posts);    
      // console.log(Posts);
    }      
    catch(err){
      captureException(err);
      setisErr(true);
    }
  } 
  useEffect(()=>{
    handleList();
  }
  ,[])
  const navigatePost=(id:number)=>{
    navigate(`./post/${id}`)
  }
  return (
    <Box sx={{
      mx:'auto',
      display:'flex',
      flexDirection:'column',
      width:{
        'xs':'50%',
        'sm':400,
        'md':800,
      },gap:2
    }}>
    {posts.map(
        (post:Post)=>(
          <Box
          key={post.Post_Id} onClick = {(e:React.MouseEvent<HTMLDivElement>)=>{navigatePost(post.Post_Id)}} sx={{
            '&:hover':{
              boxShadow:3,
              zIndex:10,
            },p:1
          }}>
            <IconAvatar username={post.Post_Username}/>
            <Typography variant="h4" sx={{textAlign:'center'}}>
                {post.Post_Theme}
            </Typography>
            <Typography variant="body1">
               {post.Post_Content}
            </Typography>
            </Box>
        ))
      }
    </Box>
  )
};

export default BlogList;
