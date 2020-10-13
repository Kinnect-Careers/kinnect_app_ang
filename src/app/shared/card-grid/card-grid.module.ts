import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from './card-grid.component';
import { MaterialModule } from './../../../material/material.module';
import { AngularMaterialModule } from './../../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CardGridComponent],
  imports: [
    AngularMaterialModule,
    MaterialModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [CardGridComponent]
})
export class CardGridModule { }
