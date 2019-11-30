import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

import { PostService } from '../../service/post.service'
import { AuthenticationService } from "../../service/authorization.service";
import { SubscriptionService } from "../../service/subscription.service";
import { PostView } from "../../interfaces/PostView";
import { LikeService } from "../../service/like.service";
import {User} from "../../interfaces/User";

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})


export class PostsListComponent implements OnInit {
    postViews: PostView [] = [];
    username: string;
    forceToReload: any;
    showButton: boolean;
    userPage: boolean;
    error: string;
    currentUser: User;

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
        this.currentUser = this.authService.currentUserValue;
        this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
        });
        if(this.authService.isLoggedIn()){
            if(this.authService.currentUserValue.login != this.username){
                this.userPage = false;
                this.subscriptionService.isSubscribed(this.currentUser.token, this.currentUser.login, this.username)
                    .subscribe( response => {
                        this.showButton = !response;
                    })
            }
            else{
                this.userPage = true;
            }
        }
        this.getPosts();
    }


    getPosts() {
        this.postService.getPosts(this.currentUser.token, this.username, this.page)
            .subscribe(
                res => {
                    this.likeService.getPostView(res['content'])
                        .subscribe(views => this.postViews = views);
                    this.collectionSize = new Array(res['totalPages'])
                },
                err => this.error = err.error.message
            );
    }

    onSubmit(){
        this.subscriptionService.makeSubscription(this.currentUser.token, this.currentUser.login, this.username)
            .subscribe(response => console.log(response), error => console.log(error));
        this.router.navigate(['/posts',this.username]);
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
