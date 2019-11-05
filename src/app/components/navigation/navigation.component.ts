import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../service/authorization.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    isLoggedIn: boolean = false;
    constructor(private authService: AuthenticationService,
                private router: Router) { }

    ngOnInit() {
        this.authService.tokenUser.subscribe( data => { this.isLoggedIn = data;});
        if(this.isLoggedIn) this.router.navigate(['']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/sign-in'])
    }
}
