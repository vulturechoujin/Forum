import React,{useState} from 'react';
import type { User } from './myType';
export function CreateUser(user:User){
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
export default CreateUser;
