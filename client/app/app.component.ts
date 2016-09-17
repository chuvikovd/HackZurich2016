import {Component, OnInit} from 'angular2/core';
import {MainChatComponent} from './mainChat.component';
import {JoinChatComponent} from './joinChat.component';
import {ChatService, Server} from './chat.service';

@Component({
    selector: "app",
    directives: [MainChatComponent, JoinChatComponent],
    template: `
    <div class="app-container">
    
        <join-chat *ngIf="!server.joined"></join-chat>
        
        <main-chat *ngIf="server.joined"></main-chat>
        
    </div>
  `
})

export class AppComponent implements OnInit {

    server: Server;

    constructor(private _chatService: ChatService) {}

    ngOnInit(){
        //one component is created grab a reference to the server from the Chat Service
        this.server = this._chatService.getServer();
    }
}