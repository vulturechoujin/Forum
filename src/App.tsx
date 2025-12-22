import "./index.css";
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import Discussion from "./Discussion";
import CreatePage from "./CreatePage";
export function App() {
  return(
    // <button> My...</button>
  <Router>
    <Routes>
      <Route path = "/login" element = {<LoginPage/>}/>
      <Route path = "/discussion" element = {<Discussion/>}/>
      <Route path = "/discussion/create" element = {<CreatePage/>}/>
    </Routes>
  </Router>
  )
}

export default App;
