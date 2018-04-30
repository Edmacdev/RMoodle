import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ReportComponent } from './report/report.component';
import { CourseComponent } from './course/course.component';

import { MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatButtonModule,
          MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule,
        MatTabsModule, MatCheckboxModule, MatListModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisplayUsersDialogComponent } from '../display-users-dialog/display-users-dialog.component';

import { HttpModule } from '@angular/http';

const routes = [
  {
    path     : '',
    component: ReportComponent
  },
  {
    path     : 'course/:moodleid/:courseid',
    component: CourseComponent
  }
]

@NgModule({
  declarations:[
    ReportComponent,
    CourseComponent,
    DisplayUsersDialogComponent
  ],
  imports     :[
    RouterModule.forChild(routes),
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    FuseSharedModule,
    FuseWidgetModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule,
    HttpModule,
    MatIconModule
  ],
  entryComponents:[
    DisplayUsersDialogComponent
  ]
})
export class CoursesModule
{
}
