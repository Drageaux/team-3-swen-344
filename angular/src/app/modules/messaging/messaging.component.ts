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
  private id = 15;
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    // prevent checkbox event from "bubbling" up to the entire row (since they're overlapping)
    $('#inbox input[type=checkbox]').click(function (event) {
      console.log('test')
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
      }
    );
  }

  onCreateMessage(newMessage) {
    this.messageService.createMessage(newMessage).subscribe(
      messages => {
        this.messageService.getAllMessages(this.id).subscribe(
          messages => {
            this.messages = messages.messages;
          }
        );
      }
    );
  }

  removeMessage(e) {
    var checkedBoxes = document.querySelectorAll('input[name=removeMessage]:checked');

    for (var i = 0; i < checkedBoxes.length; i++) {
      var id = parseInt(checkedBoxes[i].getAttribute("id"));
      console.log(id);
      this.messageService.deleteMessage(id).subscribe(
        messages => {
          this.messageService.getAllMessages(15).subscribe(
            messages => {
              this.messages = [messages];
            }
          );
        }
      );
    }
  }
}
