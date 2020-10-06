import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagRoutingModule } from './tag-routing/tag-routing.module';
import { MaterialModule } from './../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [TagListComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class TagModule { }
