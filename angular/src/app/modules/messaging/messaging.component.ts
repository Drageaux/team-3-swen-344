import { Component, OnInit } from '@angular/core';
import { MessageService } from './messaging.service';
import { Message } from './message';

declare var $;

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  private messageOpen: Message = null;
  private id = parseInt(localStorage.getItem("userId"));
  messages: Message[] = [];
  showTable = true;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    // prevent checkbox event from "bubbling" up to the entire row (since they're overlappig)

    $('#inbox input[type=checkbox]').click(function (event) {
      if (event.stopPropagation) {
        // standard
        event.stopPropagation();
      } else {
        // IE6-8
        event.cancelBubble = true;
      }
    });

    this.messageService.getAllMessages(this.id).subscribe(
      messages => {
        this.messages = messages.messages;
        this.showTable = (this.messages[0] && (Object.keys(this.messages[0]).length !== 0));
      }
    );
  }

  onCreateMessage(newMessage) {
    this.messageService.createMessage(newMessage).subscribe(
      messages => {
        this.messageService.getAllMessages(this.id).subscribe(
          messages => {
            this.messages = messages.messages;
            this.showTable = (this.messages[0] && (Object.keys(this.messages[0]).length !== 0));
          }
        );
      }
    );
  }

  removeMessage(e) {
    var checkedBoxes = document.querySelectorAll('input[name=removeMessage]:checked');

    for (var i = 0; i < checkedBoxes.length; i++) {
      var id = parseInt(checkedBoxes[i].getAttribute("id"));
      this.messageService.deleteMessage(id).subscribe(
        messages => {
          this.messageService.getAllMessages(this.id).subscribe(
            messages => {
              this.messages = messages.messages;
              this.showTable = (this.messages[0] && (Object.keys(this.messages[0]).length !== 0));
              this.messageOpen = null;
            }
          );
        }
      );
    }
  }
}
