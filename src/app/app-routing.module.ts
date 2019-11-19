import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { PostsListComponent } from './components/posts-list/posts-list.component'
import { PostFormComponent } from './components/post-form/post-form.component'
import { PostPreviewComponent } from './components/post-preview/post-preview.component'
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component'

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'posts/:username', component: PostsListComponent },
  { path: 'posts/:username/page/:numpage', component: PostsListComponent },
  { path: 'posts-upload/new', component: PostFormComponent },
  { path: 'post-preview/:id', component: PostPreviewComponent },
  { path: 'subscribe/:username', component: SubscriptionsListComponent },
  { path: '', redirectTo: '/sign-in',  pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
