import React,{useState} from "react"
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
    }
    catch (err){
      console.log(err);
    }
  }
  return (
    <article>
    {posts.map(
      (post:Post)=>(<Blog post = {post}/>))
    }
    </article>
  )
};

export default BlogList;
