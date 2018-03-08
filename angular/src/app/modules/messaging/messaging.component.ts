import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  private messageOpen: boolean = false;

  constructor() {
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
  }

}
