import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsComponent } from './classrooms.component';
import { ClassroomsService } from './classrooms.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClassroomsComponent],
  providers: [ClassroomsService]
})
export class ClassroomsModule { }
