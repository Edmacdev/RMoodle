import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoodleApiService {
wsURL: string = '/webservice/rest/server.php';
wsProtocol: string = 'https://';

  constructor(
    private http:Http
  ) {}

  core_course_get_courses(host, params){

    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_course_get_courses' +
    '&moodlewsrestformat=json' +
    params.coursesid

    ).map(res => res.json())
  }

  core_user_get_users(host, params){

    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_user_get_users' +
    '&moodlewsrestformat=json' +
    '&criteria[0][key]=' + params.criteriakey +
    '&criteria[0][value]=' + params.criteriavalue
    ).map(res => res.json())
  }
  core_user_create_users(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_user_create_users' +
    '&moodlewsrestformat=json' +
    '&users[0][username]=' + params.username +
    '&users[0][password]=' + params.password +
    '&users[0][firstname]=' + params.firstname +
    '&users[0][lastname]=' + params.lastname +
    '&users[0][email]=' + params.email
    ).map(res => res.json())
  }

  gradereport_overview_get_course_grades(host, params){

    return this.http.get("https://" + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=gradereport_overview_get_course_grades' +
    '&moodlewsrestformat=json' +
    '&userid=' + params.userid
    ).map(res => res.json());
  }
  core_enrol_get_enrolled_users(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_enrol_get_enrolled_users' +
    '&moodlewsrestformat=json' +
    '&courseid=' + params.courseid
    ).map(res => res.json())
  }
  gradereport_user_get_grade_items (host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=gradereport_user_get_grade_items' +
    '&moodlewsrestformat=json' +
    '&courseid=' + params.courseid
    ).map(res => res.json())
  }
  core_course_update_courses(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_course_update_courses' +
    '&moodlewsrestformat=json' +
    '&courses[0][id]=' + params.courseid +
    '&courses[0][fullname]=' + params.fullname
    ).map(res => res.json())
  }
  core_user_update_users(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_user_update_users' +
    '&moodlewsrestformat=json' +
    '&users[0][id]=' + params.userid +
    params.userinfo
    ).map(res => res.json())
  }
  core_completion_get_activities_completion_status(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_completion_get_activities_completion_status' +
    '&moodlewsrestformat=json' +
    '&courseid=' + params.courseid +
    '&userid=' + params.userid
    ).map(res => res.json())
  }
  core_completion_get_course_completion_status(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=core_completion_get_course_completion_status' +
    '&moodlewsrestformat=json' +
    '&courseid=' + params.courseid +
    '&userid=' + params.userid
    ).map(res => res.json())
  }
  enrol_manual_unenrol_users(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=enrol_manual_unenrol_users' +
    '&moodlewsrestformat=json' +
    params.enrolments
    ).map(res => res.json())
  }
  enrol_manual_enrol_users(host, params){
    return this.http.get(this.wsProtocol + host + this.wsURL +
    '?wstoken=' + params.wstoken +
    '&wsfunction=enrol_manual_enrol_users' +
    '&moodlewsrestformat=json' +
    params.enrolments
    ).map(res => res.json())
  }
}
