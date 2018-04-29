import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../message';
import { MessageService } from '../messaging.service'
import {User} from "../user";

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
  users: User[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.newMessage = new Message({
      fromId: parseInt(localStorage.getItem("userId")),
      toId: null,
      dateCreated: "",
      title: "",
      message: "",
      deleted: ""
    });

    this.messageService.getAllUsers().subscribe((result) => {
      console.log(result.users);
      this.users = result.users;
    });
  }

  createMessage(form: NgForm) {
    let values = form.form.value;
    if(form.valid && values.messageRec && values.messageName && values.messageBody){
      this.newMessage.toId = parseInt(values.messageRec);
      this.newMessage.title = values.messageName;
      this.newMessage.message = values.messageBody;
      this.newMessage.fromId = parseInt(localStorage.getItem("userId"));
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
