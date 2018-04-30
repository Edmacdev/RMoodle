import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
//services
import { AuthService } from 'app/main/services/auth.service';
import { MoodleService } from 'app/main/services/moodle.service';
import { MoodleApiService } from 'app/main/services/moodle-api.service';

import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DisplayUsersDialogComponent } from '../../display-users-dialog/display-users-dialog.component';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subject } from 'rxjs/Subject';

import swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']

})
export class CourseComponent implements OnInit {

  //USUÁRIO DO SISTEMA
    user: any;
  //MOODLES REGISTRADOS NO SISTEMA
    moodles: any[];
    moodle: any;
  // COURSE
    courseid:string;
    course: any;
  //STATUS
    is_ready: boolean = false;
    is_course: boolean = false;
    is_loading: boolean = false;
    is_course_finished: boolean = false;
    //USUÁRIOS MATRICULADOS NO CURSO
      enrolled_users: any[] = [];
      enrolled_teachers: any[] = [];
      enrolled_students: any[] = [];
    //ATIVIDADES CONCLUIDAS E NOTAS DOS ALUNOS
      activities_status: any[] = []
      course_status_array: any[] = []
      user_grades: any[];
  //DATA TABLE
    display_columns: string[] = ['risk', 'name', 'email','phone','lastaccess', 'progress', 'grade','options'];
    display_columns_result: string[] = ['name', 'email','phone','result', 'grade','options'];
    display_columns_users_result: string[] = ['name', 'email','chekbox']
    data_source: MatTableDataSource<any>;
    data_source_users_result: MatTableDataSource<any>;
    selected_user_info: object;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private moodleService: MoodleService,
    private moodleApiService: MoodleApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        if(user){
          this.user = user;
          this.moodleService.getMoodles(this.user.uid).subscribe(
            moodles => {
              if(moodles.length > 0){
                this.moodles = moodles;
                this.route.params.subscribe(
                  params => {
                    this.courseid = params.courseid;
                    this.moodle = this.moodles.find((element)=>{return element.id == params.moodleid})

                    this.getCourse();
                    this.report();
                  }
                )
              }
            }
          )
        }
      }
    )
  }
  getCourse(): void{

    const params: object ={
      wstoken: this.moodle.token,
      coursesid: '&options[ids][0]=' + this.courseid
    }
    this.moodleApiService.core_course_get_courses(this.moodle.url, params).subscribe(
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
        let result = data.sort((a,b) => a.fullname.localeCompare(b.fullname));
        this.course = result[0];
        console.log(this.course);
        this.is_course = true;
      },
      err => {
        if(err.status == 0){
          swal({
            type: 'error',
            text: 'O URL registrado não é válido.'
          })
        }
        else(console.log(err))
      }
    )
  }

  report():void{
    this.is_ready = false;
    this.is_loading = true;
    this.activities_status = [];
    this.course_status_array = [];

    // STATUS
    var status: boolean[] = [false, false];
    var status_subject: Subject<string> = new Subject();
    //Inscrição que observa a mudança de status
    status_subject.subscribe(
      data => {
        switch(data){
          case 'enrolled_users':
            status[0] = true;
          break
          case 'usersActivitiesCompletion':
            status[1] = true;

          break
          case 'usersCourseCompletion':
            status[1] = true;

          break
          default: console.log('default: ' + data)
        }
        if(status.every(st => st === true)){
          this.data_source = new MatTableDataSource(
            this.prepareDataSource(
              this.enrolled_students,
              this.user_grades,
              this.activities_status,
              this.course_status_array
            ))
          this.is_ready = true;
          this.is_loading = false;

          setTimeout(
            () => {
              this.data_source.paginator = this.paginator;
              this.data_source.sort = this.sort;

              // $(".input-title").focusout(event => this.changeTitleHandler());
              // $(".input-title").keyup(
              //   (event) =>{
              //     if(event.which == 13){
              //       this.changeTitleHandler()
              //     }
              //   }
              // )
              // $(".user-info").focusout(
              //   (event) => {
              //     this.changeUserInfoHandler(this.selected_user_info, event)
              //   }
              // )
              // $(".user-info").keyup(
              //   (event) =>{
              //     if(event.which == 13){
              //       this.changeUserInfoHandler(this.selected_user_info, event)
              //     }
              //   }
              // )
            },400
          )
        }
        else this.is_ready = false;
      }
    )
    //BUSCAR USUÁRIOS MATRICULADOS
    let enrolled_users;
    this.moodleApiService.core_enrol_get_enrolled_users(this.moodle.url,{wstoken: this.moodle.token,courseid: this.courseid})
    .subscribe(
      data => {
        if(data.errorcode){
          return false;
        }
        if(data.length > 0){

          this.enrolled_users = data;
          this.enrolled_teachers = data.filter(element =>  element.roles[0].roleid == 3);
          this.enrolled_students = data.filter(element =>  element.roles[0].roleid == 5);
          this.enrolled_students = this.enrolled_students.sort((a,b) => a.fullname.localeCompare(b.fullname));
          status_subject.next('enrolled_users');

          //BUSCAR NOTAS DOS ALUNOS

          this.moodleApiService.gradereport_user_get_grade_items(this.moodle.url,{wstoken: this.moodle.token,courseid: this.courseid})
          .subscribe(
            data => {
              if(data.errorcode){
                return false;
              }
              this.user_grades= data.usergrades.sort((a,b) => a.userfullname.localeCompare(b.userfullname));

              if(!this.is_course_finished){
                //BUSCAR ATIVIDADES FEITAS POR ALUNOS
                let activitiesStatusRequestArray: any[] =[]
                for(let i in this.user_grades){
                  let userid = this.user_grades[i].userid
                  let request = this.moodleApiService.core_completion_get_activities_completion_status(this.moodle.url,{wstoken: this.moodle.token,courseid: this.courseid, userid: userid});
                  this.activities_status.push(request);
                }
                forkJoin(this.activities_status).subscribe(
                  result => {
                    console.log(result)
                    this.activities_status = result;
                    status_subject.next('usersActivitiesCompletion');
                  }
                )
              }
              else{
                //VERIFICAR SE USUÁRIO CONCLUIU O CURSO
                let courseStatusRequestArray: any[] =[]
                for(let i in this.user_grades){
                  let userid = this.user_grades[i].userid
                  let request = this.moodleApiService.core_completion_get_course_completion_status(this.moodle.url,{wstoken: this.moodle.token,courseid: this.courseid, userid: userid})
                  this.course_status_array.push(request)
                }
                forkJoin(this.course_status_array).subscribe(
                  result => {
                    this.course_status_array = result;
                    status_subject.next('usersCourseCompletion');

                  }
                )
              }
            }
          )

        }
        else this.is_ready = true;

    })
  }

  prepareDataSource(enrolled_students, user_grades, activitiesCompletion, courseCompletion){

      let data_source:any[] = [];

      for (let i in enrolled_students){
        let uid:string = enrolled_students[i].id;
        let name:string = enrolled_students[i].fullname;
        let firstname:string = enrolled_students[i].firstname;
        let lastname:string = enrolled_students[i].lastname;
        let email:string = enrolled_students[i].email;
        let phone:string = enrolled_students[i].phone1;
        let enrolledcourses = enrolled_students[i].enrolledcourses

        //last access
        let lastaccess = this.getDaysSinceLastAccess(enrolled_students[i].lastaccess);

        //grade
        let gradeitems =user_grades.find((element)=>{return element.userid == uid}).gradeitems
        let grade = gradeitems[gradeitems.length - 1].graderaw;
        if(!grade) grade = -1;
        if(!this.is_course_finished){
          //Progress

            let activities = activitiesCompletion[i].statuses.length;
            let activitiesCompleted = 0;
            for(let j in activitiesCompletion[i].statuses){
              if(activitiesCompletion[i].statuses[j].state != 0) activitiesCompleted++
            }

            let progress = Math.floor((activitiesCompleted *100)/ activities);
            //status
            let risk: string = '';
            let courseTime = this.courseTime(this.course);
            if( progress >= courseTime.progress ) risk = '1 - baixo'
            else{
              if(lastaccess <= 48 ) risk = '2 - médio';
              else risk = '3 - alto'
            }
            let elem = {
              id: uid,
              name: name,
              firstname: firstname,
              lastname: lastname,
              email: email,
              phone: phone,
              enrolledcourses: enrolledcourses,
              lastaccess: lastaccess,
              progress: progress,
              grade: grade,
              risk: risk,
              icon:''
            }
            data_source.push(elem);
        }
        else{
          //Result
          let result: string
          if(courseCompletion[i].errorcode){
            switch(courseCompletion[i].errorcode){
              case 'nocriteriaset':
                result = 'Sem Critério'
              break
              case 'cannotviewreport':
                result = 'Desconhecido'
              break
              default: result = ''
            }
          }
          else {
              let courseCompletionStatus: boolean = courseCompletion[i].completionstatus.completed;
              courseCompletionStatus? result = 'Aprovado' : result = 'Reprovado'
          }

          let elem = {
            id: uid,
            name: name,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            enrolledcourses: enrolledcourses,
            grade: grade,
            result: result
          }
          data_source.push(elem);
        }
      }
      if(this.is_course_finished) return data_source;
      else {
        data_source.sort((a,b) => a.risk.localeCompare(b.risk));
        return data_source.reverse();
      }

  }

  courseTime(course:any):any{
    let now:number = new Date().getTime();
    let enddate:number = course.enddate *1000;
    let startdate:number = course.startdate *1000;
    let distance:number = now - startdate;
    let duration:number = enddate - startdate;
    let progress:number = Math.floor((distance *100) / duration)
    let courseTime:object = {
      duration: duration,
      progress: progress
    }
    return courseTime

  }

  getDaysSinceLastAccess(last_access):number{
    if(last_access == 0){
      return null
    }
      let lastaccess = new Date(last_access *1000);
      let currentdate = new Date();
      let timeDiff = Math.abs(currentdate.getTime() - lastaccess.getTime());
      let diffDays = Math.floor(timeDiff / (1000 * 3600));
      return diffDays ;
  }

  //filtro para as informações da tabela

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data_source.filter = filterValue;
  }
  getRowColor(condition){

    if(condition == '1 - baixo') return 'rgba(54, 162, 235, 0.1)';
    else if(condition == '2 - médio') return 'rgba(255, 206, 86, 0.1)';
    else if(condition == '3 - alto') return 'rgba(255, 0, 0, 0.1)';
    else if(condition == 'Aprovado') return 'rgba(54, 162, 235, 0.1)';
    else if(condition == 'Reprovado') return 'rgba(255, 0, 0, 0.1)';
    else if(condition == 'Sem Critério') return 'rgba(255, 206, 86, 0.1)';
    else if(condition == 'Desconhecido') return 'rgba(255, 206, 86, 0.1)';
  }
  hoursToDays(hours:number):string{
    if(hours >= 24) {
      let days = Math.floor(hours/24)
      if(days == 1){
        return days + ' dia';
      }
      else if(days > 1){
        return days + ' dias'
      }
    }
    else {
      return 'menos de 1 dia'
    }
  }
  formatDate(date){
    let dateFormat = new Date(date*1000)
    return dateFormat
  }
  userReport(user){

    var resultG: any[] = [];
    var resultC: any[] = [];
    let params = {
      wstoken: this.moodle.token,
      userid: user.id
    }

    this.moodleApiService.gradereport_overview_get_course_grades(this.moodle.url, params).subscribe(
      data => {
        resultG = data.grades;

        if (user.enrolledcourses !== 0){
          var courseids = function() {
            let courseidsString = '';
            for (let i in user.enrolledcourses){
              courseidsString += '&options[ids][' + [i] + ']=' + user.enrolledcourses[i].id ;
            }
            return courseidsString
          }

          let params = {
            wstoken: this.moodle.token,
            coursesid: courseids()
          }
          this.moodleApiService.core_course_get_courses(this.moodle.url, params).subscribe(
            data => { resultC = data;},
            err => {},
            () => {
              let dialogRef = this.dialog.open(DisplayUsersDialogComponent, {
                width: '1500px',
                height: '800px',
                data: {
                  name: user.name,
                  grades: resultG,
                  courses: resultC
                }
              })

              dialogRef.afterClosed().subscribe(result => {

              })
            }
          )
        }
        else {
          let dialogRef = this.dialog.open(DisplayUsersDialogComponent,{
            width: '1500px',
            height: '800px',
            data: {
              name: name,
              grades: resultG,
              courses: resultC
            }
          });
        };
      },
      err => {console.log(err); return false},
    )
  }

}
