import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {

  // constructor() { }
  // Modified constructor; public messgeService because about to bind to template
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
