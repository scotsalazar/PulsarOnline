import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesDetailComponent} from './classes-detail/classes-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'add-course/:id', component: AddCourseComponent },
  // { path: 'classes', loadChildren: './classes/classes.module#ClassesModule'}
  {
    path: 'classes',
    component: ClassesComponent,
    children: [{ path: ':name', component: ClassesDetailComponent },]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
