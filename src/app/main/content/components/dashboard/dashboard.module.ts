import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardComponent } from './dashboard.component';
const routes = [
    {
        path     : '',
        component: DashboardComponent
    }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ],
  declarations: [
    DashboardComponent
  ]

})
export class DashboardModule { }
