import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Moodle } from '../models/Moodle';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MoodleService {

  moodles: Observable<Moodle[]>
  moodlesCollection:AngularFirestoreCollection<Moodle>

  constructor(
    private afStore: AngularFirestore
  ) {}

  validateRegister(moodle){
    if(moodle.name == undefined || moodle.url == undefined || moodle.token == undefined ){
      return false
    }else{
      return true;
    }
  }

  addMoodle(uid:string, moodle){
    const userRef: AngularFirestoreCollection<Moodle> = this.afStore.collection('Usuários/' + uid + '/moodles');
      return userRef.add(moodle)
  }

  getMoodles(uid: string){
    this.moodlesCollection = this.afStore.collection('Usuários/' + uid + '/moodles', ref => ref.orderBy('name', 'asc'))
    this.moodles = this.moodlesCollection.snapshotChanges().map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Moodle;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    )
    return this.moodles
  }

  updateMoodle(uid: string, mid: string, moodle: Moodle){
    const userRef: AngularFirestoreDocument<Moodle> = this.afStore.doc('Usuários/' + uid + '/moodles/' + mid);
    return userRef.set(moodle)
  }

  removeMoodle(uid: string, mid: string){
    const userRef: AngularFirestoreDocument<Moodle> = this.afStore.doc('Usuários/' + uid + '/moodles/' + mid);
    return userRef.delete();
  }
  setDefaultMoodle(uid: string, moodle: Moodle){
    const userRef: AngularFirestoreDocument<Moodle> = this.afStore.doc('Usuários/' + uid + '/DefaultMoodle/' + 'moodle');
    return userRef.set(moodle)
  }
  getDefaultMoodle(uid: string){
    return this.afStore.collection('Usuários/' + uid + '/DefaultMoodle').snapshotChanges()
    .map(
      changes => {
        return changes.map(
          res => {
            const data = res.payload.doc.data() as Moodle;
            return data;
          }
        )
      }
    )
  }
}
