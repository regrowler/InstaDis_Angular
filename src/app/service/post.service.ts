import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Post} from '../interfaces/Post'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  URI = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  createPost(title: string, description: string, post: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', post);
    return this.http.post(this.URI, fd);
  }

  getPosts() {
    return this.http.get<Post[]>(this.URI);
  }

  getPost(id: string) {
    return this.http.get<Post>(`${this.URI}/${id}`);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updatePost(id: string, title: string, description: string) {
    return this.http.put(`${this.URI}/${id}`, {title, description});
  }
}