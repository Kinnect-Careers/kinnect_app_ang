import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from './../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './../error-pages/server-error/server-error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'user', loadChildren: () => import('./../user/user.module').then(m => m.UserModule)},
  { path: 'tag', loadChildren: () => import('./../tag/tag.module').then(m => m.TagModule) },
  { path: 'jobs', loadChildren: () => import('./../job/job.module').then(m => m.JobModule) },
  { path: 'resume', loadChildren: () => import('./../resume/resume.module').then(m => m.ResumeModule)},
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
