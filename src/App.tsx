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
import * as Sentry from "@sentry/react";
import TopicDiscussion from "./TopicDiscussion";
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
      <Route path = "/signup" element = {<SignupPage/>}/>
      <Route path = "/" element = {<Discussion/>}/>
      <Route path = "/:topic" element = {<TopicDiscussion/>}/>
      <Route path = "/:topic/create" element = {<CreatePage/>}/>
      <Route path = "/:topic/:post_id" element = {<Blog/>}/>
      <Route path = "/login" element = {<LoginPage/>}/>
    </Routes>
  </Router>
  )
}

export default App;
