import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }