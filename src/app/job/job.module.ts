import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRoutingModule } from './job-routing/job-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { MaterialModule } from './../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class JobModule { }
