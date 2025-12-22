import React from "react"
import {redirect, useNavigate} from 'react-router-dom'
import { BlogList } from "./BlogList";
export function Discussion() {
  const navigate = useNavigate();
  const navigateBlog = ()=>{
    navigate('./create');
  }
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
