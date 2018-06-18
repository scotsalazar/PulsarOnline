import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.css']
})
export class ClassesDetailComponent implements OnInit {
  class$;
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.class$ = this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('name');
        
        console.log(name);
        console.log(this.afs.doc('classes/' + name).set);
        console.log(this.afs.doc('classes/' + name));
        return this.afs.doc('classes/' + name).valueChanges();
        // return this.afs.doc('classes/' + name).snapshotChanges();
        
      })
    );
  }
}
