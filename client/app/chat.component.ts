import { Component } from 'angular2/core';
import { Message } from '../models/Message'
import {ChatService} from './chat.service';

@Component({
    selector: "chat",
    //providers: [ChatService],
    template: `
    <div class="chat-container">
        <div id="chat">
            <form class="form-inline text-right">
                <fieldset>
                  <input type="text" class="form-control msg-input" [(ngModel)]="inputValue" placeholder="Type a message here" autocomplete="off" required autofocus />
                  <button id="send" class="btn btn-success msg-send" (click)="sendMessage()">Send</button>
                </fieldset>
            </form>
        </div>
    </div>
  `
})

export class ChatComponent {

    inputValue;

    constructor(private _chatService: ChatService) {}

    sendMessage() {
        this._chatService.sendMessage(this.inputValue);
    }
}