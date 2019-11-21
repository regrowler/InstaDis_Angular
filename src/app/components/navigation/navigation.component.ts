import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from "../../service/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../interfaces/User";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    currentUser: User;

    constructor(private authService: AuthenticationService,
                private activatedRoute: ActivatedRoute,
                private router: Router){ 
    }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => this.currentUser = user);
        this.router.navigate([window.location.pathname]);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/sign-in'])
    }
}
