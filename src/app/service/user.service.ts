import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http: HttpClient;
    private url: string = "http://localhost:8080/users";

    constructor() { }

    public ifUserExists(username: string): Observable<boolean>{
        return this.http.get<boolean>(this.url + '/' + username);
    }
}
