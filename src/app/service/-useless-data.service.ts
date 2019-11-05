import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UselessDataService {

    url = 'http://localhost:4200/users/useless';

    constructor(private http : HttpClient) { }

    public getUselessData() : Observable<string>{
        let defaultHeader = new HttpHeaders({
            'authorization': localStorage.getItem('token')
        });
        return this.http.post<string>(this.url, '',{'headers': defaultHeader});
    }

}
