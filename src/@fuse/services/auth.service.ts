import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import swal from 'sweetalert2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../models/User';
import { Moodle } from '../models/Moodle';
@Injectable()
export class AuthService {

  user: Observable<User>;

   constructor(
     private afAuth: AngularFireAuth,
     private afStore: AngularFirestore,
     private router: Router
   ) {
     const firestore = firebase.firestore();
     const settings = {/* your settings... */ timestampsInSnapshots: true};
     firestore.settings(settings);
     this.user = this.afAuth.authState
     .switchMap(
       user => {
         if(user){
           return this.afStore.doc<User>('Usuários/' + user.uid).valueChanges()
         }else{
           return Observable.of(null)
         }
      })
    }

   getUser(){
     return this.user;
   }

   googleLogin(){
     const provider = new firebase.auth.GoogleAuthProvider()
     return this.oAuthLogin(provider)
     .then(
       credential => this.router.navigate(['dashboard'])
     );
   }

   private oAuthLogin(provider){
     return this.afAuth.auth.signInWithPopup(provider)
     .then((credential) => {
       this.updateUserData(credential.user)
       this.router.navigate(['']);
     })
     .catch(e => console.error(e))
   }

   updateUserData(user){
     const userRef: AngularFirestoreDocument<User> = this.afStore.doc('Usuários/'+ user.uid);
     const data: User = {
       uid: user.uid,
       email: user.email,
       displayName: user.displayName,
       photoURL: user.photoURL
     }
     return userRef.set(data);
   }

   signIn(username, password){
    return this.afAuth.auth.signInWithEmailAndPassword(username, password)
  }

   signOut(){
     this.afAuth.auth.signOut();
     this.router.navigate(['']);
   }

  registerUser(email, password){
   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

}
