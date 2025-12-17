import "../index.css";
import React from "react";
interface handleInput{
    handleUsername:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    handlePassword:(e:React.ChangeEvent<HTMLInputElement>)=>void,
};
export function InputBox({handleUsername,handlePassword}:handleInput)  {
  return (
    <div>
      <label htmlFor="username" className = "athlabel">Username</label>
      <input type = "text" className="ath" 
      placeholder = "Your username"  id = "username" required
      onChange = {handleUsername}/>

      <label htmlFor="password" className = "athlabel">Password</label>
      <input type = "password" className = "ath" 
      name = "password" id = "password" required
      onChange = {handlePassword}/>  
    </div>
  );
}
export default InputBox;