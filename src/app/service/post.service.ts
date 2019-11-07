import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Post} from '../interfaces/Post'
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    // todo: change url to http://localhost:8080/posts
    url = 'http://localhost/posts';


    constructor(private http: HttpClient) {
    }

    createPost(title: string, description: string, post: File) {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('description', description);
        fd.append('image', post);
        return this.http.post(this.url, fd);
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.url);
    }

    getPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.url}/${id}`);
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`);
    }

    updatePost(id: string, title: string, description: string): Observable<any> {
        return this.http.put(`${this.url}/${id}`, {title, description});
    }
}

