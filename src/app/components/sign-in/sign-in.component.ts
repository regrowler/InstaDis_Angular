import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../service/authorization.service";
import { Router } from "@angular/router";
import { TokenService } from "../../service/token.service";

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
    usernameRegularExpression = /^[a-zA-Z_]*$/;

    errorCodeMessage: string[] = [
        "Username starts with digits",
        "Username contains prohibited symbols"
    ];

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
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

        let code = this.isValidUsernameChecker(this.loginForm.value.username);
        if(code > -1){
            this.error = this.errorCodeMessage[code];
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
          .subscribe(
            response => {
                this.router.navigate(['/posts',response.login]);
            },
            error => {
                this.error = error.error.message;
                this.loading = false;
            });
    }

    isValidUsernameChecker(username : string) : number {
        if(username.search(/\d/) == 0) {
            return 0;
        }
        if(!this.usernameRegularExpression.test(username)){
           return 1;
        }
        return -1; // everything is OK
    }

}
