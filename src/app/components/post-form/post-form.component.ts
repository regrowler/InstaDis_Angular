import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {PostService} from '../../service/post.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postSelected: string | ArrayBuffer;
  file: File;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  onPostSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.postSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPost(title: HTMLInputElement, description: HTMLTextAreaElement) {
    this.postService
      .createPost(title.value, description.value, this.file)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/posts'])
        },
        err => console.log(err)
      );
    return false;
  }

}