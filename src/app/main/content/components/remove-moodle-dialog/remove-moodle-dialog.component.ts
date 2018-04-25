import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-remove-moodle-dialog',
  templateUrl: './remove-moodle-dialog.component.html',
  styleUrls: ['./remove-moodle-dialog.component.scss']
})
export class RemoveMoodleDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveMoodleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  onCloseConfirm(){
    this.dialogRef.close('confirm');
  }
  onCloseCancel(){
    this.dialogRef.close("cancel")
  }
}
