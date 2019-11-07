import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { PostService } from '../../service/post.service'
import { Post } from '../../interfaces/Post'

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {

  id: string;
  post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.postService.getPost(this.id)
        .subscribe(
          res => {
            this.post = res;
          },
          err => console.log(err)
        )
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/posts']);
      })
  }

  updatePost(title: HTMLInputElement, description: HTMLInputElement): boolean {
    this.postService.updatePost(this.post._id, title.value, description.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/posts']);
      });
    return false;
  }

}
