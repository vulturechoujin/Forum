import React from "react"
import type { Blog_Prop } from "./myType";
export function Blog({post}:Blog_Prop) {
  return (
    <h5>
        {post.Post_Content}
    </h5>
  )
};

export default Blog;
