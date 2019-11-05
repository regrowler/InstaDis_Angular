import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private _header = 'authorization';
    private _token: string;


    get header(): string {
        return this._header;
    }

    set header(value: string) {
        this._header = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    constructor() { }
}
