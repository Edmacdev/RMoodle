import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MoodleApiService } from 'app/main/services/moodle-api.service';

@Component({
  selector: 'app-display-moodles-dialog',
  templateUrl: './display-moodles-dialog.component.html',
  styleUrls: ['./display-moodles-dialog.component.scss']
})
export class DisplayMoodlesDialogComponent implements OnInit {
  selectedMoodle: string;
  is_moodle_selected: boolean = false;
  constructor(
    private moodleApiService: MoodleApiService,
    public dialogRef: MatDialogRef<DisplayMoodlesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  onCloseConfirm() {
    this.dialogRef.close(this.selectedMoodle);
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
