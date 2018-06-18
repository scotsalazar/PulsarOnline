import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  providers: [CourseService]
})
export class AddCourseComponent implements OnInit {
  courseid: string;
  item: Course;
  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.courseid = param.get('id');
    });
    console.log('SCOT: ' + this.courseid);

    if (this.courseid) {
      this.editCourse(this.courseid);
    } else {
      this.item = {
        name: '',
        description: '',
        category: '',
        seqno: 0,
        createdate: new Date(),
        isactive: true,
        id: ''
      };
    }
  }
  onSubmit() {
    if (this.courseid) {
      if (this.item.name !== '') {
        this.courseService.updateCourse(this.item);
        this.router.navigate(['course']);
      }
    } else {
      if (this.item.name !== '') {
        this.courseService.addCourse(this.item);
        this.router.navigate(['course']);
      }
    }
  }

  editCourse(courseid) {
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
      console.log('error ');
    });
  
}
}
