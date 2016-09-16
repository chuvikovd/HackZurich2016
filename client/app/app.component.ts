import {Component, OnInit} from 'angular2/core';

@Component({
    selector: "chat-app",
    template: `
    <div class="container">
      <h1>{{title}} 
        <span>{{title}}</span>
      </h1>
    </div>
  `
})

export class AppComponent implements OnInit {

    title: string = "Express Angular 2 ToDo";

    ngOnInit(){
        this.title = 'asd'
    }

}
