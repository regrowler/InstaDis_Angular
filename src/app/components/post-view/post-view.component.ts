import {Component, Input, OnInit} from '@angular/core';
import {PostView} from "../../interfaces/PostView";
import {AuthenticationService} from "../../service/authorization.service";
import {LikeService} from "../../service/like.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

    @Input() post: PostView;
    @Input() username: string;
    @Input() userPage: boolean;
    error: string;

    constructor(private authService: AuthenticationService,
                private likeService: LikeService,
                private router: Router
    ) {
    }

    ngOnInit() {
    }

    like(id: number, isLike: boolean) {
        this.likeService.like(this.authService.currentUserValue.login, id, isLike)
            .subscribe(like => {
                    this.router.navigate(['/posts', this.username]);
                },
                error => this.error = error.error.message)
    }

    selectedCard(id: number) {
        if(this.userPage) {
            this.router.navigate(['post-preview', id]);
        }
    }

}
