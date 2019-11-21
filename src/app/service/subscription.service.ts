import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
    url = 'http://localhost:8080/users/subscribe';
    is = '/is';

    constructor(private http: HttpClient) {
    }


    makeSubscription(user: string, subscribe: string): Observable<any>{
    return this.http.post<any>(this.url, {
            "username": user,
            "subscribe": subscribe,
        });
    }

    getSubscriptionList(user: string): Observable<any>{
      return this.http.get<User[]>(this.url + '/' + user);
    }


    isSubscribed(user: string, subscribe: string): Observable<Boolean>{
        return this.http.post<Boolean>(this.url + this.is,{
            "username": user,
            "subscribe": subscribe,
        })
    }

}
