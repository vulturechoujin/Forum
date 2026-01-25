import React,{useState} from 'react';
import {type Post, type Reply, type User } from './myType';
const API_URL = process.env.BUN_PUBLIC_BACKEND_URL??"localhost:8000";
export function AddUser(user:User){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/users`,{
        method:'POST',
        headers:headers,
        body: JSON.stringify(user)
    });
    return fetch(request);
}
export function VerifyUser(user:User){
        const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    console.log(user.username);
    const request: RequestInfo = new Request(`${API_URL}/login`,{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify(user)
    });
    return fetch(request);
}

//Post
export function RenderPost(topic:string){
    console.log(topic);
    const headers: Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    headers.set('X-Custom-Header', 'CustomValue');
    const request: RequestInfo = new Request(`${API_URL}/discussion/${topic}`,{
        method:'GET',
        headers:headers
    });
    return fetch(request);
}
export function AddPost(data:Post){
    console.log(data);
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/createpost`,{
        method:'POST',
        headers:headers,
        body: JSON.stringify(data)
    });
    return fetch(request);
}
export function DeletePost(){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/deletepost`,{
        method:'POST',
        headers:headers,
        body: JSON.stringify("")
    });
    return fetch(request);
}
export function UpdatePost(){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/updatepost`,{
        method:'POST',
        headers:headers,
        body: JSON.stringify("")
    });
    return fetch(request);
}

export function GetPost(id:string){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    headers.set('X-Custom-Header', 'CustomValue');
    const request: RequestInfo = new Request(`${API_URL}/getpost/${id}`,{
        method:'GET',
        headers:headers,
    });
    return fetch(request); 
}
export function LikePost(post_id:number){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/likepost`,{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify(post_id)
    });
    return fetch(request);
}

//Login and Logout

export function CheckToken(){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/cookies`,{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify("")
    });
    return fetch(request);
}
export function LogOut(){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/logout`,{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify("")
    });
    return fetch(request);
}
//Replies
export function RenderReplies(id:number){
    const headers: Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    headers.set('X-Custom-Header', 'CustomValue');
    const request: RequestInfo = new Request(`${API_URL}/getreplies/${id}`,{
        method:'GET',
        headers:headers,
    });
    return fetch(request);
}
export function AddReply(data:Reply){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/createreply`,{
        method:'POST',
        headers:headers,
        body: JSON.stringify(data)
    });
    return fetch(request);
}
export function LikeReply(Reply_Id:number){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request(`${API_URL}/likereply`,{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify(Reply_Id)
    });
    return fetch(request);
}


