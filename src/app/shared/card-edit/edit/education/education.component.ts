import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryService } from './../../../repository.service';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

interface Option {
  value: string;
  viewValue: string;
}

interface DialogData {
  school: string;
  degree_type: string;
  degree: string;
  startDate: any;
  endDate: any;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'add-education',
  templateUrl: 'education.component.html',
  styleUrls: ['education.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AddEducation implements OnInit{ 
  current: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddEducation>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private repository: RepositoryService
  ) {}

  ngOnInit(): void {
    this.data.startDate = new FormControl(moment());
    this.data.endDate = new FormControl(moment());
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    
    this.repository.create(`api/v1/education/`, {
      institution: this.data.school,
      degree_type: this.data.degree_type,
      degree: this.data.degree,
      started_at: this.data.startDate.value.format("YYYY-MM-DD"),
      ended_at: !this.current ? this.data.endDate.value.format("YYYY-MM-DD") : null,
      current: this.current
    })
    .subscribe(res => {
        console.log(res);
    });
    
  }

  chosenYearHandler(normalizedYear: Moment, option) {
    const ctrlValue = this.data[option];
    ctrlValue.year(normalizedYear.year());
    this.data[option].setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, option) {
    const ctrlValue = this.data[option];
    ctrlValue.month(normalizedMonth.month());
    this.data[option].setValue(ctrlValue);
    datepicker.close();

  }

}
