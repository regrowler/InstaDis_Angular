import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/User";
import {SubscriptionService} from "../../service/subscription.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authorization.service";

@Component({
    selector: 'app-subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.css']
})
export class SubscriptionsListComponent implements OnInit {

    users: User[] = [];
    selectedUser: User;
    username: string;
    error: string;
    currentUser: User;
    constructor(private subscriptionService: SubscriptionService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
        });
        this.subscriptionService.getSubscriptionList(this.currentUser.token, this.username)
            .subscribe(users => this.users = users, error => this.error = error.error.message);
    }

    onSelect(user: User): void{
        this.selectedUser = user;
        this.router.navigate(['/posts',this.selectedUser.login]);
    }

}
