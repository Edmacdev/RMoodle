import { NgModule } from '@angular/core';

import { Login2Module } from './login-2/login-2.module';
import { AngularFireModule  } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../../../../environments/environment';


@NgModule({
    imports     : [
      //Login
      Login2Module,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
      AngularFireStorageModule // imports firebase/storage only needed for storage features
    ]
})
export class AuthModule
{
}
