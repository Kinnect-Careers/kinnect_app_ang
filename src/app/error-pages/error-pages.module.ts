import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialModule } from './../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServerErrorComponent } from './server-error/server-error.component';




@NgModule({
  declarations: [NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ErrorPagesModule { }
