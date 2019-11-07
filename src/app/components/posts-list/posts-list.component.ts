import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router'

import { PostService } from '../../service/post.service'
import { Post } from '../../interfaces/Post'

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
    posts: Post[] = [];

    constructor(
        private postService: PostService,
        private router: Router
    ) {
    }

    ngOnInit() {
        // delete this after backend connected
        this.postService.getTestPosts()
            .subscribe(
                res => {
                    this.posts = res;
                },
                err => console.log(err)
            )
    }

    selectedCard(id: string) {
        this.router.navigate(['/posts', id]);
    }

}
