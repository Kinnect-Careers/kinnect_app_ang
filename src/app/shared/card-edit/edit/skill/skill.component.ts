import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryService } from './../../../repository.service';

interface DialogData {
  name: string;
  description: string;
}
@Component({
  selector: 'add-skill-info',
  templateUrl: 'skill.component.html'
})
export class AddSkill {

  constructor(
    public dialogRef: MatDialogRef<AddSkill>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private repository: RepositoryService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.data.description = this.data.description ? this.data.description : 'No description';
    this.repository.create(`api/v1/skill/`, {
      ...this.data
    })
    .subscribe(error => {
      console.log(error);
    });
  }
}
