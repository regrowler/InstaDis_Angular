import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { fakeBackendProvider } from "./_fakeBackend/fake-backend";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MainPageComponent } from "./main-page/main-page.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { UselessDataDisplayerComponent } from './useless-data-displayer/useless-data-displayer.component';


@NgModule({
   imports: [
       BrowserModule,
       AppRoutingModule,
       HttpClientModule,
       ReactiveFormsModule
   ],
  declarations: [
    AppComponent,
    MainPageComponent,
    SignInComponent,
    SignUpComponent,
    UselessDataDisplayerComponent
  ],
   providers: [
     fakeBackendProvider
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
