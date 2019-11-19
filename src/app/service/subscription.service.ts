import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  url = 'http://localhost:8080/users/subscribe';

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

}
