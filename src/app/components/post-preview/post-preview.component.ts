import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { PostService } from '../../service/post.service'
import { Post } from '../../interfaces/Post'
import {AuthenticationService} from "../../service/authorization.service";

@Component({
    selector: 'app-post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {

    post: Post;
    error: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authorizationService: AuthenticationService,
        private postService: PostService,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.postService.getPost(this.authorizationService.currentUserValue.login,+params['id'])
                .subscribe(res => {
                    this.post = res;
                    },
                err => console.log(err)
            )
        });
    }

    deletePost() {
        this.postService.deletePost(this.post.id)
            .subscribe(res => {
                this.router.navigate(['/posts',this.authorizationService.currentUserValue.login]);
        })
    }

    updatePost(title: HTMLInputElement, description: HTMLInputElement): boolean {
        this.postService.updatePost(this.post.id, title.value, description.value)
            .subscribe(res => {
                this.router.navigate(['/posts',this.authorizationService.currentUserValue.login]);
            },
                error => this.error = error.error.message);
        return false;
    }

}
