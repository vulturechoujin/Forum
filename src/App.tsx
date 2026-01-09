import "./index.css";
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,

} from "react-router-dom";
import Discussion from "./Discussion";
import CreatePage from "./CreatePage";
import Blog from "./Blog";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import { ThemeProvider } from "@emotion/react";
// const theme = {
//   palette:{
//     mode:"light",
//   }
// }
export function App() {
  return(
    // <button> My...</button>
  // <ThemeProvider theme = {theme}>
  <Router>
    <Routes>
      <Route path = "/" element = {<SignupPage/>}/>
      <Route path = "/discussion" element = {<Discussion/>}/>
      <Route path = "/discussion/create" element = {<CreatePage/>}/>
      <Route path = "/discussion/post/:id" element = {<Blog/>}/>
      <Route path = "/login" element = {<LoginPage/>}/>
      </Routes>
  </Router>
  // </ThemeProvider>
  )
}

export default App;
