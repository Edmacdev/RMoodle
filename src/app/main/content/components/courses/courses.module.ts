import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportComponent } from './report/report.component';

import { MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatButtonModule,
          MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path     : 'report',
    component: ReportComponent
  }
]

@NgModule({
  declarations:[
    ReportComponent
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
    MatSelectModule
  ]
})
export class CoursesModule
{
}
