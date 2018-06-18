import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/observable';
// import {Observable} from '@reactivex/rxjs/es6/Observable.js';
import { Course } from '../model/course.model';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map, filter, switchMap } from 'rxjs/operators';
// import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;
  item: Course;
  courseDoc: AngularFirestoreDocument<Course>;

  constructor(public afs: AngularFirestore) {
    // this.courseCollection = this.afs.collection('course', ref => ref.orderBy('seqno','asc'));
    // this.courses = this.courseCollection.valueChanges();
    this.courseCollection = this.afs.collection('course');
    this.courses = this.courseCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Course;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getCourses() {
     return this.courses;
   }

   getCourse(courseid) {
     this.afs.doc(`course/${courseid}`).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log('document exists');
        doc.data();
        const data = doc.data() as any;
        return { courseid, ...data };

      } else {
        console.log('No such document!');
      }      
     }).catch(function (error) {
       console.log('Error getting document:', error);
     }).then(result => {
       this.item = result;
     }).catch(err => {
       console.log('error');
     });

     return this.item;
   }

   addCourse(course: Course) {
    //  this.afs.collection('course').doc(course.id).set(course).then();
     this.courseCollection.add(course);
   }

   updateCourse(course: Course) {
     this.courseDoc = this.afs.doc(`course/${course.id}`);
     this.courseDoc.update(course);
   }

   deleteCourse(course: Course) {
     this.courseDoc = this.afs.doc(`course/${course.id}`);
     this.courseDoc.delete();
   }



   
}
