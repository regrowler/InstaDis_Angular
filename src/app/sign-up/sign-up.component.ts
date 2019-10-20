import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUpService} from "../service/sign-up.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authorization.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private signUpService: SignUpService
    ) {
    }

    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            email:     ['', Validators.required],
            username:  ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get signUpFromControls() { return this.signUpForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        this.loading = true;
        this.signUpService.signUp(this.signUpForm.value)
          .pipe(first())
          .subscribe(
            data => {
                this.router.navigate(['/sign-in'], { queryParams: { signedUp: true }});
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

}
