import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../service/authorization.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    currentUser: any;
    constructor(private authService: AuthenticationService,
                private router: Router) { }

    ngOnInit() {
        this.authService.currentUser.subscribe(user =>{
            this.currentUser = user
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/sign-in'])
    }
}
