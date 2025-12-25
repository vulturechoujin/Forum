import React from "react"
import { useParams,useLocation } from 'react-router-dom'
import type { Post } from "./myType";
export function Blog() {
  const location = useLocation();
  const posts = location.state;
  // console.log(posts);
  const {id} = useParams();
  if(id === undefined){
    return <h2>Invalid</h2>
  }
  const post = posts.find((p:Post)=>p.Post_Id === parseInt(id));
  // console.log(posts[4].Post_Id);
  // console.log(post);
  if(!post){
    return <h2>Blog not found</h2>
  }
  return (
    <div>
      <h2>
        {post.Post_Content}
      </h2>
    </div>
  )
};

export default Blog;
