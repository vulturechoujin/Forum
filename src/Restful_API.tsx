import React,{useState} from 'react';
import type { Post, Reply, User } from './myType';
//user
export function AddUser(user:User){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request("http://localhost:8000/users",{
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
    const request: RequestInfo = new Request("http://localhost:8000/login",{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify(user)
    });
    return fetch(request);
}

//Post
export function RenderPost(){
    const headers: Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    headers.set('X-Custom-Header', 'CustomValue');

    const request: RequestInfo = new Request("http://localhost:8000/discussion",{
        method:'GET',
        headers:headers
    });
    return fetch(request);
}
export function AddPost(data:Post){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request("http://localhost:8000/createpost",{
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
    const request: RequestInfo = new Request("http://localhost:8000/deletepost",{
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
    const request: RequestInfo = new Request("http://localhost:8000/updatepost",{
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
    const request: RequestInfo = new Request("http://localhost:8000/getposts",{
        method:'POST',
        headers:headers,
        body: JSON.stringify(parseInt(id))
    });
    return fetch(request); 
}
export function LikePost(){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request("http://localhost:8000/likepost",{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify("")
    });
    return fetch(request);
}

//Login and Logout

export function CheckToken(){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request("http://localhost:8000/cookies",{
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
    const request: RequestInfo = new Request("http://localhost:8000/logout",{
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
    const request: RequestInfo = new Request("http://localhost:8000/getreplies",{
        method:'POST',
        headers:headers,
        body:JSON.stringify(id)
    });
    return fetch(request);
}
export function AddReply(data:Reply){
    const headers:Headers = new Headers();
    headers.set('Content-Type','application/json');
    headers.set('Accept','application/json');
    const request: RequestInfo = new Request("http://localhost:8000/createreply",{
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
    const request: RequestInfo = new Request("http://localhost:8000/likereply",{
        method:'POST',
        credentials:'include',
        headers:headers,
        body: JSON.stringify(Reply_Id)
    });
    return fetch(request);
}


