import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryService } from './../../../repository.service';
import { OtherInterface } from './../../../../_interface/other.model';

interface DialogData{
  name: string;
  description: string;
  type_data: string;
  data: string;
}
@Component({
  selector: 'add-other-info',
  templateUrl: 'other.component.html'
})
export class AddOther {

  constructor(
    public dialogRef: MatDialogRef<AddOther>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private repository: RepositoryService
  ) {console.log("DATA:", data)}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.repository.create(`api/v1/other/`, {
      ...this.data
    })
    .subscribe(error => {
      console.log(error);
    });
  }
}
