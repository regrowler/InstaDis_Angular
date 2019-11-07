import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    url: string = "http://localhost:8080/users/sign-up";
    constructor(private http: HttpClient) { }

    signUp(login: string, password: string) : Observable<any> {
        return this.http.post<any>(this.url, {"login": login, "password": password});
    }
}
