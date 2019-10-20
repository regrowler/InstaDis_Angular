import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import {UselessDataDisplayerComponent} from "./useless-data-displayer/useless-data-displayer.component";


const routes: Routes = [
    //{ path: '' , component: MainPageComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'uselessData', component: UselessDataDisplayerComponent },
    // otherwise redirect to main-page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
