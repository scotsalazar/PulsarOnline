import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Class } from '../model/class.model';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classCollection: AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;

  constructor(public afs: AngularFirestore) {
    this.classes = this.afs.collection('classes').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Class;
        data.id = a.payload.doc.id;
        return data;
      });
    }))
   }


getClass() {
  return this.classes;
}

}