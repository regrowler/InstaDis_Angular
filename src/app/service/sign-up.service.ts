import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor(private http: HttpClient) { }

    signUp(signUpForm) : Observable<any> {
        return this.http.post('http://localhost:4200/users/sign-up', signUpForm);
    }
}
