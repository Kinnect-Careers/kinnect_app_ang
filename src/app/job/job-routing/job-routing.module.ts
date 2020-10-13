import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './../job-list/job-list.component';
import { CardDetailComponent } from './../../shared/card-detail/card-detail.component';

const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: ':id', component: CardDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class JobRoutingModule { }
