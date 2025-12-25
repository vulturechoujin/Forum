import React,{useEffect, useState} from "react"
import { RenderPost } from "./Restful_API";
import type { Post } from "./myType";
import { Link } from 'react-router-dom'
export function BlogList() {
  const [posts,setPosts] = useState<Post[]>([]);
    const handleList = async()=>{
    try{
      const response = await RenderPost();
      const Posts = await response.json();
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
  return (
    <div>
    {posts.map(
      (post:Post)=>(
        <article key={post.Post_Id}>
          <Link to = {`./post/${post.Post_Id}`} state = {posts}>{post.Post_Content}</Link>
        </article>
      ))
    }
    </div>
  )
};

export default BlogList;
