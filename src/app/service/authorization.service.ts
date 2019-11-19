import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private url: string = "http://localhost:8080/users/sign-in";

    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    public currentUser = this.currentUserSubject.asObservable();


    constructor(private http: HttpClient) {
        console.log(JSON.parse(localStorage.getItem('currentUser')));
    }

    get currentUserValue(): any{
        return this.currentUserSubject.value;
    }

    login(login: string, password: string) : Observable<any>{
        return this.http.post<any>(this.url, {"login": login, "password": password})
                    .pipe(map(user =>{
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                    }));
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(false);
    }
}
