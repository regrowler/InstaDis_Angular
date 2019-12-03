import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from "../interfaces/User";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private url: string = "http://localhost:8080/token/sign-in";

    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    public currentUser = this.currentUserSubject.asObservable();


    constructor(private http: HttpClient) {
    }

    get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(login: string, password: string) : Observable<User>{
        return this.http.post<User>(this.url, {"login": login, "password": password})
                    .pipe(map(user =>{
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                    }));
    }

    isLoggedIn() : boolean{
        return !!this.currentUserValue;

    }

    logout(): void {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
