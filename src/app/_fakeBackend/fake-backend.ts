import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { USERS } from "../user";

let users = USERS;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        sessionStorage.setItem('users',JSON.stringify(users));
        const userStorage = JSON.parse(sessionStorage.getItem('users'));

        return of(null)
          .pipe(mergeMap(handleRoute));

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/sign-in') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/sign-up') && method === 'POST':
                    return register();
                default:
                    return next.handle(request);
            }
        }

        function register() {
            const user = body;
            if(userStorage) {
                if (userStorage.find((x) => x.username == user.username)) {
                    return error('User with such name is already taken');
                }
            }
            user.id =  users.length ? Math.max(...users.map((x)=>x.id)) + 1: 1;
            users.push(user);
            return SendHttpResponse(200,new HttpHeaders(),'registration token');
        }

        function authenticate() {
            const tmpUser = body;
            const user = userStorage.find(x => x.username === tmpUser.username && x.password === tmpUser.password);
            if (!user) return error('Username or password is incorrect');
            let header = new HttpHeaders({
                'authorization' : user.id + ' ' + user.email + ' ' + user.username,
            });
            return SendHttpResponse(200, header, user);
        }

        function SendHttpResponse(status,header? : HttpHeaders,body?) : Observable<HttpResponse<any>> {
            return of(new HttpResponse({ body: body, headers: header, status: status }));
        }

        function error(message) {
            return throwError(message);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
