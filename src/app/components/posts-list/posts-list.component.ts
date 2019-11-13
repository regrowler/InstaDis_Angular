import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'

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
    username: string;
    forceToReload: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService,
        private postService: PostService,
        private router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.forceToReload = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        })
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
        });
        this.postService.getPosts(this.username)
            .subscribe(
                res => {
                    this.posts = res
                },
                err => console.log(err)
            )
    }

    selectedCard(id: number) {
        if(this.authService.currentUserValue.login == this.username) {
            this.router.navigate(['post-preview', id]);
        }
    }
    

}
