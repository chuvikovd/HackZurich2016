import { Component } from 'angular2/core';
import { ChatService } from './chat.service';

@Component({
    selector: "join-chat",
    //providers: [ChatService],
    directives: [JoinChatComponent],
    template: `
    <div class="main-container">
        <div id="join">
            <form id="JoinForm" class="form-inline text-right">
                <fieldset>
                  <input type="text" class="form-control" [(ngModel)]="inputValue" placeholder="Enter your username" autocomplete="off" required autofocus />
                  <button id="send" class="btn btn-success" (click)="joinChat()">Join</button>
                </fieldset>
            </form>
        </div>
    </div>
  `
})

export class JoinChatComponent {

    inputValue;

    constructor(private _chatService: ChatService) {}

    joinChat() {
        console.log("test click1111");
        this._chatService.joinChat(this.inputValue);
        console.log(this.inputValue);

    }
}