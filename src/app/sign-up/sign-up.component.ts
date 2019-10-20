import { Component, OnInit } from '@angular/core';
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SignUpService } from "../service/sign-up.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    error: string;

    errorCodeMessage: string[] = [
       'starts with digits', //0
       'does not match template', //1
    ];

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private signUpService: SignUpService,
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


        if (this.signUpForm.invalid) {
            return;
        }


        //default regular expression for email xd
        let emailRegExp: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let value = this.signUpForm.value;
        if(!this.SignUpFormValueChecker('Email',value.email, emailRegExp)){
            console.log('email');
            return;
        }
        let loginRegExp: RegExp = /^[a-zA-Z_0123456789]*$/;
        if(!this.SignUpFormValueChecker('Username', value.username, loginRegExp)){
            console.log('username');
            return;
        }
        let passwordRegExp: RegExp = /^[a-zA-Z0123456789]*$/;
        if(!this.SignUpFormValueChecker('Password', value.password, passwordRegExp)){
            console.log('login');
            return;
        }

        this.loading = true;
        this.signUpService.signUp(this.signUpForm.value)
          .pipe(first())
          .subscribe(
            response => {
                this.router.navigate(['/sign-in'], { queryParams: { signedUp: true }});
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

    isValidData(data : string, regExp: RegExp) : number {
        if(data.search(/\d/) == 0) {
            return 0;
        }
        if(!regExp.test(data)){
            return 1;
        }
        return -1; // everything is OK
    }

    SignUpFormValueChecker(SignUpFormValueName: string, SignUpFormValue: string, allowedRegExp: RegExp): boolean {
        let code = this.isValidData(SignUpFormValue, allowedRegExp);
        if(code > - 1){
            this.error = SignUpFormValueName + ' ' + this.errorCodeMessage[code];
            return false;
        }
        return true;
    }
}
