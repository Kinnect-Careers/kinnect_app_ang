import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEditComponent } from './card-edit.component';
import { MaterialModule } from './../../../material/material.module';
import { AngularMaterialModule } from './../../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddPersonal } from './edit/personal/personal.component';
import { AddExperience } from './edit/experience/experience.component';
import { AddEducation } from './edit/education/education.component';
import { AddSkill } from './edit/skill/skill.component';
import { AddOther } from './edit/other/other.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [CardEditComponent, AddPersonal, AddExperience, AddEducation, AddSkill, AddOther],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaterialModule,
    FlexLayoutModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ]
})
export class CardEditModule { }
