import { Component, OnInit} from '@angular/core';
import { AuthService } from 'app/main/services/auth.service';
import { MoodleService } from 'app/main/services/moodle.service';
import { MoodleApiService } from 'app/main/services/moodle-api.service';

import { DisplayMoodlesDialogComponent } from '../../display-moodles-dialog/display-moodles-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import swal from 'sweetalert2';

declare var Chart: any

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
//USUÁRIO DO SISTEMA
  user: any;
//MOODLES
  moodles: any[];
  default_moodle: any;
  current_moodle: any ;

//COURSES
  courses: any = [];
  filtered_courses: any = [];
  search_term: string = '';
//STATUS
  is_courses: boolean = false;
  is_ready: boolean = false;
  is_moodles: boolean = false;


  constructor(
    private authService: AuthService,
    private moodleService: MoodleService,
    private moodleApiService: MoodleApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        if(user){
          this.user = user;
          this.moodleService.getMoodles(this.user.uid).subscribe(
            moodles => {
              if(moodles.length > 0){
                this.is_moodles = true;
                this.moodles = moodles;
                this.moodleService.getDefaultMoodle(this.user.uid).subscribe(
                  data => {
                    if(data.length !== 0){
                      this.current_moodle = data[0];
                      this.getCourses();
                    }
                  }
                )
              }
              else {
                this.is_moodles = false;
                swal({
                  type: 'error',
                  text: 'Não há moodles registrados'
                })
              }
            }
          )
        }
      }
    )
  }
  //função que busca os cursos de um determinado Moodle
  getCourses():void{
    this.is_ready = false;
    this.is_courses = false;
    const params:object = {
      wstoken: this.current_moodle.token,
      coursesid: ''
    }
    this.moodleApiService.core_course_get_courses(this.current_moodle.url, params).subscribe(
      data => {
        if(data.errorcode){
          let errortext: string;
          switch(data.errorcode){
            case 'invalidtoken':
              errortext = 'O token registrado é inválido.';
            break
            default: errortext = 'Ocorreu um erro desconhecido'
          }
          swal({
            type: 'error',
            text: errortext
          })
          return false;
        }
        else if(data.length > 0){
          this.courses = data.sort((a,b) => a.fullname.localeCompare(b.fullname));
          this.filtered_courses = this.courses;
          this.is_courses = true;
        }
        this.is_ready = true;
      },
      err => {
        if(err.status == 0){
          swal({
            type: 'error',
            text: 'O URL registrado não é válido.'
          })
        }
      }
    )
  }

  goToCourse(){
    const data ={
      url:this.current_moodle.url,
      token: this.current_moodle.token
    }
  }
  filterCoursesByTerm(){
        const search_term = this.search_term.toLowerCase();

        // Search
        if ( search_term != '' )
        {
          this.filtered_courses = this.courses.filter((course) => {
            return course.displayname.toLowerCase().includes(search_term);
          });
        }
    }
  moodlesDialog(){
    let dialogRef = this.dialog.open(
      DisplayMoodlesDialogComponent,
      {
        width: '300px',
        height: '350px',
        disableClose: true,
        data: this.moodles
      }
    )
    dialogRef.afterClosed().subscribe(
      result => {
        if(result != 'Cancel'){
          let moodle = this.moodles.find(
            (element) => {return element.id == result;}
          )
          this.current_moodle = moodle;
          this.getCourses();
        }
      }
    )
  }
}
