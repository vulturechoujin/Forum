import React from 'react'
export interface User{
    username:string,
    password:string
};
export interface AccountButton_Prop{
    loginData:User
}
export interface Blog_Prop{
    post:Post
}
export interface Post{
    post_id:number,
    post_content:string
}