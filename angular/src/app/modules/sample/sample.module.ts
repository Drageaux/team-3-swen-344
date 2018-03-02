import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { FormsModule } from '@angular/forms';
import { SampleService } from './sample.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SampleComponent],
  providers: [SampleService]
})
export class SampleModule { }
