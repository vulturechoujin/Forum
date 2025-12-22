import React from "react"
import type { Blog_Prop } from "./myType";
export function Blog({post}:Blog_Prop) {
  return (
    <div>
        {post.post_content}
    </div>
  )
};

export default Blog;
