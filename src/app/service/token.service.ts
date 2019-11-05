import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    public header = 'authorization';
    public token: string;

    constructor() { }
}
