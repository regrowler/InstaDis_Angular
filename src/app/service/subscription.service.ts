import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
    url = 'http://localhost:8080/api/users/subscribe';
    is = '/is';

    constructor(private http: HttpClient) {
    }


    makeSubscription(token: string, user: string, subscribe: string): Observable<any>{
    return this.http.post<any>(this.url, {
            "username": user,
            "subscribe": subscribe,
        },{headers: this.createHeader(token)});
    }

    getSubscriptionList(token: string, user: string): Observable<any>{
      return this.http.get<User[]>(this.url + '/' + user,{headers: this.createHeader(token)});
    }


    isSubscribed(token: string, user: string, subscribe: string): Observable<Boolean>{
        return this.http.post<Boolean>(this.url + this.is,{
            "username": user,
            "subscribe": subscribe,
        },{headers: this.createHeader(token)})
    }

    createHeader(token: string): HttpHeaders{
        return  new HttpHeaders({
            'authorization' : token,
        });
    }

}
