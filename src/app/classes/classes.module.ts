import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ClassesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClassesComponent]
})
export class ClassesModule { }
