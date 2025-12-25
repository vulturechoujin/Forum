import React, { useEffect } from "react"
import {redirect, useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
import { CheckToken } from "./Restful_API";
export function Discussion() {
  const navigate = useNavigate();
  const navigateBlog = ()=>{
    navigate('./create');
  }
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await CheckToken();
        // if(!response.ok){
        //   navigate('../login')
        // }
      }
      catch(error){
        console.log(error);
      }
    }
    fetchData();
  },[]);
  return (
    <div className = "grid_container">
      <div className = "navbar">
      </div>
      <div className = "body"> 
        <div className ="left">
          <button className = "Add a blog" onClick ={navigateBlog}>
            +Post
          </button>
        </div>
        <div className = "main-content">
          <BlogList/>
        </div>
      </div>
      <div className = "footer">
      </div>
    </div>
  )
};

export default Discussion;
