import React,{useEffect, useState} from "react"
import { RenderPost } from "./Restful_API";
import type { Post } from "./myType";
import Blog from "./Blog";
export function BlogList() {
  const [posts,setPosts] = useState<Post[]>([]);
    const handleList = async()=>{
    try{
      const response = await RenderPost();
      const Posts = await response.json();
      setPosts(Posts);
      console.log(Posts);
      // let newPost = {
      //   post_id:2,
      //   post_content:"abc"
      // };
      // let x: Post[] =[newPost];
      // setPosts(x);
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
    <article>
    {posts.map(
      (post:Post)=>(<Blog post = {post} key = {post.Post_Id}/>))
    }
    </article>
  )
};

export default BlogList;
