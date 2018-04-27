import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from './messaging.component';
import { MessageService } from './messaging.service';
import { MessageFormComponent } from "./message-form/message-form.component";
import { FormsModule}   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MessagingComponent, MessageFormComponent],
  providers: [ MessageService ]
})
export class MessagingModule { }
