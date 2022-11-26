import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ms-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onCancel(): void {
    this.dialogRef.close({action:'cancel'});
  }

  onConfirm(): void {
    this.dialogRef.close({action:'confirm'});
  }

  yes() { 
    this.dialogRef.close("yes");
  }

}
