import { Component, OnInit } from '@angular/core';
import { UselessDataService } from "../service/-useless-data.service";

@Component({
    selector: 'app-useless-data-displayer',
    templateUrl: './useless-data-displayer.component.html',
    styleUrls: ['./useless-data-displayer.component.css']
})
export class UselessDataDisplayerComponent implements OnInit {

    info: string;

    constructor(private uselessService : UselessDataService) {

    }


    ngOnInit() {
        this.uselessService.getUselessData()
            .subscribe( response => {
                this.info = response;
            });
    }

}
