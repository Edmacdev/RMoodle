import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';

import { AuthService } from './main/services/auth.service';
import { MoodleService } from './main/services/moodle.service';
import { MoodleApiService } from './main/services/moodle-api.service';
import { DataShareService } from './main/services/data-share.service';

import { AuthGuard } from './main/guards/auth.guard';

import { AngularFireModule  } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
      path      : 'auth',
      loadChildren: './main/content/auth/auth.module#AuthModule',
      canActivate: [AuthGuard]
  },
  {
      path      : 'dashboard',
      loadChildren: './main/content/components/dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuard]
  },
  {
      path      : 'moodles',
      loadChildren: './main/content/components/moodles/moodles.module#MoodlesModule',
      canActivate: [AuthGuard]
  },
  {
      path      : 'courses',
      loadChildren: './main/content/components/courses/courses.module#CoursesModule',
      canActivate: [AuthGuard]
  },
  {
      path      : 'error',
      loadChildren: './main/content/error/404/error-404.module#Error404Module',
      canActivate: [AuthGuard]
  },
    {
        path      : '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path      : '**',
        redirectTo: 'error/404'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule, // imports firebase/storage only needed for storage features

        HttpModule
    ],
    providers   :[
      AuthService,
      MoodleService,
      MoodleApiService,
      DataShareService,
      AuthGuard
    ],
    bootstrap   : [
        AppComponent
    ]

})
export class AppModule
{
}
