import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Post } from '../interfaces/Post'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    url = 'http://localhost:8080/api/posts';

    constructor(private http: HttpClient) {
    }

    createHeader(token: string): HttpHeaders{
        return  new HttpHeaders({
            'authorization' : token,
        });
    }

    createPost(token: string, user: any, title: string, description: string, postSelected: string | ArrayBuffer): Observable<any> {
        return this.http.post<any>(this.url, {
            "title": title,
            "user": user,
            "description": description,
            "file": postSelected,
        },
            {headers: this.createHeader(token)});
    }



    getPosts(token: string, username: string, page: number): Observable<Post[]> {
        return this.http.get<Post[]>(this.url + '/' + username + '/page/'+ page, {headers: this.createHeader(token)});
    }

    getPost(token: string, username: string, id: number): Observable<Post> {
        return this.http.get<Post>(this.url + '/' + username + '/' + id, {headers: this.createHeader(token)});
    }

    deletePost(token: string, id: number): Observable<any> {
        return this.http.delete(this.url + '/' + id, {headers: this.createHeader(token)});
    }

    updatePost(token: string, id: number, title: string, description: string): Observable<any> {
        return this.http.put(this.url, {id, title, description}, {headers: this.createHeader(token)});
    }
}

