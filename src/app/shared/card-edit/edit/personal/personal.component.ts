import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryService } from './../../../repository.service';

interface Option {
  value: string;
  viewValue: string;
}

interface DialogData {
  value: string;
  info: string;
}
@Component({
  selector: 'add-personal-info',
  templateUrl: 'personal.component.html'
})
export class AddPersonal {
  
  options: Option[] = [
    {value: 'P', viewValue: 'Phone'},
    {value: 'E', viewValue: 'Email'},
    {value: 'W', viewValue: 'Website'},
    {value: 'R', viewValue: 'Repositoty'}
  ];

  constructor(
    public dialogRef: MatDialogRef<AddPersonal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private repository: RepositoryService
  ) {
    console.log(`Options: ${this.options}`);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if ("EPRW".includes(this.data.value)){
      const endpoint = "EP".includes(this.data.value) ? "contact" : "link";
      let body = {};
      body[`${endpoint}_type`] = this.data.value;
      body[`${endpoint}`] = this.data.info;
      this.repository.create(`api/v1/${endpoint}/`, body)
      .subscribe(error => {
        console.log(error);
      });
    }
  }
}
