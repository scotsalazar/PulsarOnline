import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseService]
})
export class CourseComponent implements OnInit {

  items: Course[];
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(items => {
      this.items = items;
    })
  }
  deleteCourse(item: Course) {
    this.courseService.deleteCourse(item);
  }
}
