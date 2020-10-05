import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResumeListComponent } from './../resume-list/resume-list.component';

const routes: Routes = [
  { path: 'resumes', component: ResumeListComponent}
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
