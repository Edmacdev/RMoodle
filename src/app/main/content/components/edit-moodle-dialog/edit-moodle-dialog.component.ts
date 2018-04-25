import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-moodle-dialog',
  templateUrl: './edit-moodle-dialog.component.html',
  styleUrls: ['./edit-moodle-dialog.component.scss']
})
export class EditMoodleDialogComponent implements OnInit {
  fg_edit_moodle: FormGroup;

  form_name: string;
  form_url: string;
  form_token: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditMoodleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fg_edit_moodle = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'url': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      'token': [null, Validators.compose([Validators.required, Validators.minLength(32)])]
    })
  }

  ngOnInit() {
    this.form_name = this.data.name;
    this.form_url = this.data.url;
    this.form_token = this.data.token;
  }
  onCloseConfirm(){
    this.fg_edit_moodle.value.id = this.data.id
    let data ={
      status: 'confirm',
      value: this.fg_edit_moodle.value
    }
    this.dialogRef.close(data)

  }
  onCloseCancel(){
    let data ={
      status: 'cancel'
    }
    this.dialogRef.close(data)
  }

}
