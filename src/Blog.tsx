import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useStatus, type Post, type Reply } from "./myType";
import { AddReply, GetPost } from "./Restful_API";
import ReplyList from "./ReplyList";
export function Blog() {
  const [username,isLogin] = useStatus();
  const navigate = useNavigate();
  const [post,setPost] = useState<Post>({
    Post_Content:"",
    Post_Username:"",
    Post_Id:0
  })
  const {id} = useParams();
  if(id === undefined){
    return <h2>Invalid</h2>
  }
  useEffect(()=>{
    const handleExist = async()=>{
      try{
        const response = await GetPost(id);
        const responseJson = await response.json();
        if(response.status === 202){
          setPost(responseJson)
        }
      }
      catch(err){
        console.log(err);
      }
    }
    handleExist();
  },[])
  if(post.Post_Id===0){
    return <h2>Blog not found</h2>
  }
  const CreateComment=async()=>{
    if(!isLogin){
      navigate('/login');
    }
    const data = (document.getElementById('create-comment') as HTMLInputElement).value;
    try{
    let newComment:Reply = {
      Reply_Id:0,
      Post_Id:post.Post_Id,
      Reply_Content:data,
      Reply_Username:username,
      Num_Likes:0
    }
    const response = await AddReply(newComment);
    const responseJson = await response.json();
    console.log(responseJson);
  }
    catch(error){
      
    }
  }
  return (
    <div>
      <div className = "blog-content">
        <h2>
          {post.Post_Id}
          {post.Post_Content}
        </h2>
      </div>
      <div className = "review">
        <button>Like</button>
        <button>Comment</button>
      </div>
      <div className = "comments-section">
        <textarea name = "create-comment" id = "create-comment" rows={5} cols ={50}/>
        <button onClick={CreateComment}>Create Comment</button>
        <ReplyList post_id = {post.Post_Id}/>
      </div>
    </div>
  )
};

export default Blog;
