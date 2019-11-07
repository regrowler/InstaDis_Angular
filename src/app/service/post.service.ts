import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Post} from '../interfaces/Post'
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    // todo: change url
    URI = ' http://insta.local/posts';

    constructor(private http: HttpClient) { }

    createPost(title: string, description: string, post: File) {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('description', description);
        fd.append('image', post);
        return this.http.post(this.URI, fd);
    }

    getPosts(): Observable<Post[]>  {
        return this.http.get<Post[]>(this.URI);
    }

    getPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.URI}/${id}`);
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete(`${this.URI}/${id}`);
    }

    updatePost(id: string, title: string, description: string): Observable<any> {
        return this.http.put(`${this.URI}/${id}`, {title, description});
    }

    //delete this, after connect backend
    getTestPosts() : Observable<Post[]>{
        return of(POSTS);
    }

}

const POSTS : Post[] = [
    { _id: '1', title: "My cat", description: "Cat", imagePath:"assets/img/1.jpg"},
    { _id: '2', title: "Joker", description: "Joker.", imagePath:"assets/img/2.jpg"},
    { _id: '3', title: "Bart Simpson", description: "Bart", imagePath:"assets/img/3.jpg"},
];

