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
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';

@NgModule({
   imports: [
       BrowserModule,
       AppRoutingModule,
       HttpClientModule,
       ReactiveFormsModule
   ],
  declarations: [
    AppComponent,
    loginRegistration
    MainPageComponent,
    SignInComponent,
    SignUpComponent,
    UselessDataDisplayerComponent
    NavigationComponent,
    PostsListComponent,
    PostFormComponent,
    PostPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
   providers: [
     fakeBackendProvider
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }