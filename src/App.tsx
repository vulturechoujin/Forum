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
import Something from "./something";
import * as Sentry from "@sentry/react";
// const theme = {
//   palette:{
//     mode:"light",
//   }
// }
export function App() {
    Sentry.init({
    dsn:process.env.BUN_PUBLIC_SENTRY_DNS,
    tracesSampleRate:1.0
  })
  return(
    // <button> My...</button>
  <Router>
    <Routes>
      <Route path = "/" element = {<SignupPage/>}/>
      <Route path = "/discussion" element = {<Discussion/>}/>
      <Route path = "/discussion/create" element = {<CreatePage/>}/>
      <Route path = "/discussion/post/:id" element = {<Blog/>}/>
      <Route path = "/login" element = {<LoginPage/>}/>
      <Route path = "/test" element = {<Something/>}/>
    </Routes>
  </Router>
  )
}

export default App;
