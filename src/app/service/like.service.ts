import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Post } from "../interfaces/Post";
import { Observable, of} from "rxjs";
import { PostView } from "../interfaces/PostView";
import {Like} from "../interfaces/Like";

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    url = 'http://localhost:8080/like';
    constructor(private http: HttpClient) { }

    getPostView(posts: any[]): Observable<PostView[]>{
        let postViews = new Array<PostView>();
        for (let post of posts){
            let postView = new PostView();
            postView.post = post;
            postView.like = 0;
            postView.dislike = 0;
            for(let like of post.likes){
                if(JSON.parse(JSON.stringify(like)).like){
                    postView.like++;
                }
                else{
                    postView.dislike++;
                }
            }
            postViews.push(postView);
        }
        return of(postViews);
    }

    like(username: string, postId: number, isLike: boolean): Observable<any> {
        return this.http.post<any>(this.url,{username,postId,isLike});
    }
}
