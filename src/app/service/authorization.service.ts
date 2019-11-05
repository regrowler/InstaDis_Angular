import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) {

    }

    login(signInForm) : Observable<HttpResponse<any>>{
        return this.http.post<any>('http://localhost:4200/users/sign-in', signInForm, {observe: 'response'});
    }
}
