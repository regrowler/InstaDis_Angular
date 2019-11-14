import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from "../../service/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    currentUser: any;
    usernameFormGroup: FormGroup;

    constructor(private authService: AuthenticationService,
                private activatedRoute: ActivatedRoute,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private router: Router)
    {
        this.usernameFormGroup = this.formBuilder.group({
            username:  ['', Validators.required],
        });
    }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => this.currentUser = user);
        this.router.navigate([window.location.pathname]);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/sign-in'])
    }

    onSubmit() {
        //todo: ask database if such user exists

        // let answer;
        // this.userService.ifUserExists(this.usernameFormGroup.value.username).subscribe( res => answer);
        // if(answer) {
        // }
        this.router.navigate(['/posts', this.usernameFormGroup.value.username]);

    }
}
