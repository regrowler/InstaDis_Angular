import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Post} from '../interfaces/Post'
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    // todo: change url to http://localhost:8080/posts
    url = 'http://localhost:8080/posts';

    constructor(private http: HttpClient) {
    }

    createPost(user: any, title: string, description: string, postSelected: string | ArrayBuffer): Observable<any> {
        return this.http.post<any>(this.url, {
            "title": title,
            "user": user,
            "description": description,
            "file": postSelected,
            "date": new Date().toLocaleDateString()
        });
    }

    getPosts(username: string, page: number): Observable<Post[]> {
        return this.http.get<Post[]>(this.url + '/' + username + '/page/'+ page);
    }

    getPost(username: string, id: number): Observable<Post> {
        return this.http.get<Post>(this.url + '/' + username + '/' + id);
    }

    //todo: change request
    deletePost(id: number): Observable<any> {
        return this.http.delete(this.url + '/' + id);
    }

    //todo: change request
    updatePost(id: number, title: string, description: string): Observable<any> {
        return this.http.put(this.url + '/' + id, {title, description});
    }
}

