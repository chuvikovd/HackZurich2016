import {Component} from 'angular2/core';
import {MapComponent} from './map.component';
import {ChatComponent} from './chat.component';

@Component({
    selector: "app",
    directives: [MapComponent, ChatComponent],
    template: `
    <div class="app-container">
        <map></map>
        <chat></chat>
    </div>
  `
})

export class AppComponent {

}