import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailComponent } from './card-detail.component';
import { MaterialModule } from './../../../material/material.module';
import { AngularMaterialModule } from './../../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CardDetailComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CardDetailModule { }
