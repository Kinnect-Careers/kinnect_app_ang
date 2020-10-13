import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResumeListComponent } from './../resume-list/resume-list.component';
import { CardDetailComponent } from './../../shared/card-detail/card-detail.component';

const routes: Routes = [
  { path: '', component: ResumeListComponent},
  { path: ':id', component: CardDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ResumeRoutingModule { }
