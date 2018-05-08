import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MoodleApiService } from 'app/main/services/moodle-api.service';

@Component({
  selector: 'app-display-users-dialog',
  templateUrl: './display-users-dialog.component.html',
  styleUrls: ['./display-users-dialog.component.scss']
})
export class DisplayUsersDialogComponent  {

  constructor(
    private moodleApiService: MoodleApiService,
    public dialogRef: MatDialogRef<DisplayUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(){}

  getCourseGrade(courseid){
    let courseGrade = this.data.grades.find((element) => {return element.courseid == courseid});
    if(courseGrade) return courseGrade.grade
    else return 'sem nota'
  }
  onCloseConfirm() {
    this.dialogRef.close('Confirmar');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
