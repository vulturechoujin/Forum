import React,{useState,useEffect} from "react"
import { AddPost } from "./Restful_API";
import { useNavigate } from "react-router-dom";

export function CreatePage() {
  const [message,setMessage] = useState<string>(""); 
  const navigate = useNavigate();
  const CreatePost = async()=>{
      const data = (document.getElementById('create-post') as HTMLInputElement).value;
      console.log(data);
      try{
      const response = await AddPost(data);
      var responseTxt = await response.json();
      setMessage(responseTxt);
      console.log(responseTxt);
      }
      catch(error){
        console.log(error);
      }
  }
  useEffect(()=>{
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
