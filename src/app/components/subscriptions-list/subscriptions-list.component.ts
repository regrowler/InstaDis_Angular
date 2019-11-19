import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/User";
import {SubscriptionService} from "../../service/subscription.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.css']
})
export class SubscriptionsListComponent implements OnInit {

    users: User[] = [];
    selectedUser: User;
    username: string;
    constructor(private subscriptionService: SubscriptionService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
        });
        this.subscriptionService.getSubscriptionList(this.username)
            .subscribe(users => this.users = users, error => console.log(error));
    }

    onSelect(user: User): void{
        this.selectedUser = user;
    }

}
