import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

import { PostService } from '../../service/post.service'
import { Post } from '../../interfaces/Post'
import { AuthenticationService } from "../../service/authorization.service";
import {SubscriptionService} from "../../service/subscription.service";
import {PostView} from "../../interfaces/PostView";
import {LikeService} from "../../service/like.service";

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})


export class PostsListComponent implements OnInit {
    postViews: PostView [] = [];
    username: string;
    forceToReload: any;
    currentUserPage = true;
  
    page: number = 1;
    collectionSize: Array<number>;


    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService,
        private postService: PostService,
        private subscriptionService: SubscriptionService,
        private likeService: LikeService,
        private router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.forceToReload = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        })
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
        });
        if(this.authService.currentUserValue){
            this.currentUserPage = (this.authService.currentUserValue.login == this.username);
        }
        this.getPosts();
    }


    getPosts() {
        this.postService.getPosts(this.username, this.page)
            .subscribe(
                res => {
                    this.likeService.getPostView(res['content'])
                        .subscribe(views => this.postViews = views);
                    this.collectionSize = new Array(res['totalPages'])
                },
                err => console.log(err)
            );
    }

    onSubmit(){
        this.subscriptionService.makeSubscription(this.authService.currentUserValue.login, this.username)
            .subscribe(response => console.log(response), error => console.log(error));
    }

    like(id: number, isLike: boolean){
        this.likeService.like(this.authService.currentUserValue.login,id,isLike)
            .subscribe(like => {

            },
                error => console.log(error));
        this.router.navigate(['/posts',this.username]);
    }


    selectedCard(id: number) {
        if(this.currentUserPage) {
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
        if(flag == 1 || flag == -1)
        {
            if(flag == -1 && this.page != 1) this.page = this.page - 1;
            if(flag ==  1 && (this.page+1)  <=this.collectionSize.length)  this.page = this.page + 1;
            this.getPosts();
        }
    }

    goToEndPages(flag,event:any){
        event.preventDefault();
        if(flag == 1 || flag == -1)
        {
            if(flag == -1) this.page = 1;
            if(flag ==  1)  this.page = this.collectionSize.length;
            this.getPosts();
        }
    }

}
