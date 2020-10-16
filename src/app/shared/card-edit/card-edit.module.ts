import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEditComponent } from './card-edit.component';
import { MaterialModule } from './../../../material/material.module';
import { AngularMaterialModule } from './../../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [CardEditComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CardEditModule { }
