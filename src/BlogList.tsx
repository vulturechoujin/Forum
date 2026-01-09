import React,{useEffect, useState} from "react"
import { RenderPost } from "./Restful_API";
import type { Post } from "./myType";
import { Link, useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemText, Typography } from "@mui/material";
export function BlogList() {
  const [posts,setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const handleList = async()=>{
    try{
      const response = await RenderPost();
      const Posts = await response.json();
      console.log(Posts);
      setPosts(Posts);    
      // console.log(Posts);
    }      
    catch(err){
      console.log(err);
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
    <List>
    {posts.map(
      (post:Post)=>(
        <ListItem alignItems="flex-start" key={post.Post_Id} onClick = {(e:React.MouseEvent<HTMLLIElement>)=>{navigatePost(post.Post_Id)}}>
          <ListItemText sx ={{"&:hover":""}} primary ="Theme" secondary={
            <React.Fragment>
              <Typography component="span" variant = "body2"
               sx ={{color:'text.primary',display:'inline'}}>
                {post.Post_Username}
               </Typography>
               {`—${post.Post_Content}`}
            </React.Fragment>
          }/>
        </ListItem> 
      ))
    }
    </List>
  )
};

export default BlogList;
