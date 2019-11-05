import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Post} from '../interfaces/Post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  //delete this, after connect backend
   testposts = [];

  URI = ' http://insta.local/posts';

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

 //delete this, after connect backend
  gettestposts(){
  	  return this.testposts = POSTS;
  }

}

//delete this, after connect backend
  const POSTS = [
	{ "idtest": 1, "titletest": "My cat", "testdescription": "I need some sleep", "testimage":"assets/img/1.jpg"},
    { "idtest": 2, "titletest": "Joker", "testdescription": "I thought ... my life was a tragedy... but now I realize... it's ... a Comedy.", "testimage":"assets/img/2.jpg"},
	{ "idtest": 3, "titletest": "Bart Simpson", "testdescription": "Enemies are everywhere", "testimage":"assets/img/3.jpg"},
  ]

