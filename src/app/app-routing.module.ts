import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { PostsListComponent } from './components/posts-list/posts-list.component'
import { PostFormComponent } from './components/post-form/post-form.component'
import { PostPreviewComponent } from './components/post-preview/post-preview.component'

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/new', component: PostFormComponent },
  { path: 'posts/:id', component: PostPreviewComponent },
  { path: '', redirectTo: '/posts',  pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
