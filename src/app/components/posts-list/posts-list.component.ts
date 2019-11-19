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
    page: number = 1;
    collectionSize: Array<number>;

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
        this.getPosts();
    }


    getPosts() {
        this.postService.getPosts(this.username, this.page)
        .subscribe(
            res => {
                this.posts = res['content'],
                this.collectionSize = new Array(res['totalPages'])
            },
            err => console.log(err)
        )
    }

    selectedCard(id: number) {
        if(this.authService.currentUserValue.login == this.username) {
            this.router.navigate(['post-preview', id]);
        }
    }

    setPage(i,event:any){
        event.preventDefault();
        this.page = i;
        this.getPosts();
    }
    
    getAnotherPage(flag,event:any){
        event.preventDefault();
        if(flag == 1 || flag == -1){
        if(flag == -1 && this.page != 1) this.page = this.page - 1;
        if(flag ==  1 && (this.page+1)<=this.collectionSize.length)  this.page = this.page + 1;
        this.getPosts();
    }
    }

    goToEndPages(flag,event:any){
        event.preventDefault();
        if(flag == 1 || flag == -1){
        if(flag == -1) this.page = 1;
        if(flag ==  1)  this.page = this.collectionSize.length;
        this.getPosts();
    }
    }

}
