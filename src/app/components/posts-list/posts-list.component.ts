import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'

import { PostService } from '../../service/post.service'
import { Post } from '../../interfaces/Post'
import {AuthenticationService} from "../../service/authorization.service";

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
    posts: Post[] = [];
    userID: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService,
        private postService: PostService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.userID = params['id'];
        });
        console.log(this.userID);
        this.postService.getPosts(this.userID)
            .subscribe(
                res => {
                    console.log(res);
                    this.posts = res
                },
                err => console.log(err)
            )
    }

    selectedCard(id: number) {
        console.log("auth: " + this.authService.currentUserValue.id);
        console.log("userID: " + this.userID);
        if(this.authService.currentUserValue.id == this.userID)
            this.router.navigate(['post-preview', id]);
    }

}
