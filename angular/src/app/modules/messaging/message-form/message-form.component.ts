import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../message';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['../messaging.component.css']
})
export class MessageFormComponent {

  @Input()
  newMessage: Message;

  @Output()
  create: EventEmitter<Message> = new EventEmitter();

  missingTitle = false;
  missingBody = false;
  missingId = false;

  constructor() {
  }

  ngOnInit() {
    this.newMessage = new Message({
      fromId: 15,
      toId: 15,
      dateCreated: "",
      title: "",
      message: "",
      deleted: ""
    });
    console.log(this.newMessage);
  }

  createMessage(form: NgForm) {
    let values = form.form.value;
    if(form.valid && values.messageRec && values.messageName && values.messageBody){
      this.newMessage.toId = parseInt(values.messageRec);
      this.newMessage.title = values.messageName;
      this.newMessage.message = values.messageBody;
      this.newMessage.fromId = 15;
      this.newMessage.dateCreated = Date().toLocaleString();
      this.newMessage.deleted = false;
      this.create.emit(this.newMessage);
      form.reset()
    } else {
      this.missingBody = this.missingId = this.missingTitle = false;
      if (!values.messageBody) {
        this.missingBody = true;
      }
      if (!values.messageName) {
        this.missingTitle = true;
      }
      if (!values.messageRec) {
        this.missingId = true;
      }
    }
  }

}
