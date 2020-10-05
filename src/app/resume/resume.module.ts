import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material/material.module';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeRoutingModule } from './resume-routing/resume-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ResumeListComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class ResumeModule { }
