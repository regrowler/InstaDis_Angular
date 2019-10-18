import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class UselessDataService {

    url = 'http://localhost:4200/users/useless';

    constructor(private http : HttpClient,
                private tokenService: TokenService) { }

    public getUselessData() : Observable<string>{
        let defaultHeader = new HttpHeaders({
            'authorization': this.tokenService.token,
        });
        return this.http.post<string>(this.url,this.tokenService.token,{'headers': defaultHeader});
    }

}
