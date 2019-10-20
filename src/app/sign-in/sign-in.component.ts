import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../service/authorization.service";
import { Router } from "@angular/router";
import {TokenService} from "../service/token.service";

@Component({
    selector: 'app-login',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private tokenService: TokenService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get loginFormControls() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
          .subscribe(
            response => {
                this.tokenService.token = response.headers.get(this.tokenService.header);
                this.router.navigate(['/uselessData']);
                console.log(this.tokenService.header + ': ' + this.tokenService.token);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

}
