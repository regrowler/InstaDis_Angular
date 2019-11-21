import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { AngularFontAwesomeModule} from "angular-font-awesome";
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { PostViewComponent } from "./components/post-view/post-view.component";

@NgModule({
   imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

   ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavigationComponent,
    PostsListComponent,
    PostFormComponent,
    PostPreviewComponent,
    SubscriptionsListComponent,
    PostViewComponent
  ],
   providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
