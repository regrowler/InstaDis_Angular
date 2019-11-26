import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PostService } from '../../service/post.service'
import {AuthenticationService} from "../../service/authorization.service";
import {User} from "../../interfaces/User";

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
    user: User;
    error: string;

    constructor(private postService: PostService,
                private router: Router,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = this.authenticationService.currentUserValue;
    }

    onPostSelected(event: HtmlInputEvent): void {
        if (event.target.files && event.target.files[0]) {
            this.file = <File>event.target.files[0];
            // image preview
            const reader = new FileReader();
            reader.onload = () => this.postSelected = reader.result;
            reader.readAsDataURL(this.file);
        }
    }

    uploadPost(title: HTMLInputElement, description: HTMLTextAreaElement) {
        this.postService
            .createPost(this.user,title.value, description.value, this.postSelected)
            .subscribe(
                res => {
                    this.router.navigate(['/posts',this.user.login])
                },
                err => this.error = err.error.message
            );
        return false;
    }

}
