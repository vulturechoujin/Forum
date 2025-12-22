import React,{useState} from 'react';
import type { User } from './myType';
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
export function AddPost(data:string){
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
    
}
export function UpdatePost(){

}