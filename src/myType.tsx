import React from 'react'
export interface User{
    username:string,
    password:string
};
export interface AccountButton_Prop{
    loginData:User
}
export interface Post{
    Post_Id:number,
    Post_Content:string
}