import { Component, OnInit } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { Class } from '../model/class.model';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/add/operator/map';
import { switchMap, map } from 'rxjs/operators';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  providers: [ClassService]
})
export class ClassesComponent implements OnInit {
  classes$;
  classCollection: AngularFirestoreCollection<Class>;
  // classes: Observable<Class[]>;
  classes: Class[];

  // constructor(private afs: AngularFirestore) {
  constructor(private classService: ClassService) {
    // this.classes = this.afs.collection('classes').snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Class;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   })
    // }))
   }

  ngOnInit() {
    // this.classes$ = this.afs.collection('classes').valueChanges();
    this.classService.getClass().subscribe(classes => {
      console.log(classes);
      this.classes = classes;
    })
    
    
  }

}
