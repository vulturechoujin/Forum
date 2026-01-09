import React,{useState,useEffect} from "react"
import { AddPost, CheckToken } from "./Restful_API";
import { useNavigate } from "react-router-dom";
import { useStatus, type Post } from "./myType";
export function CreatePage() {
  const [message,setMessage] = useState<string>(""); 
  const navigate = useNavigate();
  const [username,isLogin] = useStatus();
  useEffect(
    ()=>{
      if(!isLogin){
        navigate('/login');
      }
    }
    ,[])
  const CreatePost = async()=>{
      const data = (document.getElementById('create-post') as HTMLInputElement).value;
      console.log(data);
      try{
      let newPost:Post = {
        Post_Id:0,
        Post_Content:data,
        Post_Username:username
      }
      const response = await AddPost(newPost);
      var responseTxt = await response.json();
      setMessage(responseTxt);
      console.log(responseTxt);
      }
      catch(err){
        console.log(err);
      }
  }
  useEffect(()=>  {
    if(message === "Succesfully posting") {
      setTimeout(()=>{
        navigate('/discussion');
      },100)
    }
  },[message]);
  return (
    <section>
      <h2>Create a Blog Post</h2>
      <textarea name = "create-post" id = "create-post" rows={5} cols ={50}/>
      <button onClick={CreatePost}>Create Post</button>
      <h3>{message}</h3>
    </section>
  )
};

export default CreatePage;
