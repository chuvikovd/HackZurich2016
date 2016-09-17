import { Component } from 'angular2/core';
import { MapComponent } from './map.component';
import { ChatComponent } from './chat.component';


@Component({
    selector: "main-chat",
    //providers: [ChatService],
    directives: [MapComponent, ChatComponent],
    template: `
    <div class="main-container">
        <map></map>
        <chat></chat>
    </div>
  `
})

export class MainChatComponent {

}