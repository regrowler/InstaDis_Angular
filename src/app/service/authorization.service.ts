import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private tokenUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(sessionStorage.getItem('token'));
    public tokenUser = this.tokenUserSubject.asObservable();
    constructor(private http: HttpClient) {
    }


    login(signInForm) : Observable<HttpResponse<any>>{
        return this.http.post<any>('http://localhost:4200/users/sign-in', signInForm, {observe: 'response'})
            .pipe(map(token =>{
                localStorage.setItem('currentUser', JSON.stringify(token));
                this.tokenUserSubject.next(token);
                return token;
            }));
    }

    logout(): void {
        localStorage.removeItem('token');
        this.tokenUserSubject.next(false);
    }
}
