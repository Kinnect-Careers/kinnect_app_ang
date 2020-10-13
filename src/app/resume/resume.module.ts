import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material/material.module';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeRoutingModule } from './resume-routing/resume-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardGridModule } from './../shared/card-grid/card-grid.module';

@NgModule({
  declarations: [ResumeListComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CardGridModule
  ]
})
export class ResumeModule { }
