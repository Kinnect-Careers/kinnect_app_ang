import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResumeListComponent } from './../resume-list/resume-list.component';
import { CardDetailComponent } from './../../shared/card-detail/card-detail.component';
import { CardEditComponent } from './../../shared/card-edit/card-edit.component';

const routes: Routes = [
  { path: '', component: ResumeListComponent},
  { path: ':slug/edit', component: CardEditComponent},
  { path: 'new/edit', component: CardEditComponent},
  { path: ':id', component: CardDetailComponent},
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
