import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRoutingModule } from './job-routing/job-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { MaterialModule } from './../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobDataComponent } from './job-details/job-data/job-data.component';
import { CardGridModule } from './../shared/card-grid/card-grid.module';

@NgModule({
  declarations: [JobListComponent, JobDetailsComponent, JobDataComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CardGridModule,
  ]
})
export class JobModule { }
