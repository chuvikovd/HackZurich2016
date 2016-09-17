System.register(['angular2/core', './chat.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, chat_service_1;
    var JoinChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            JoinChatComponent = (function () {
                function JoinChatComponent(_chatService) {
                    this._chatService = _chatService;
                }
                JoinChatComponent.prototype.joinChat = function () {
                    console.log("test click1111");
                    this._chatService.joinChat(this.inputValue);
                    console.log(this.inputValue);
                };
                JoinChatComponent = __decorate([
                    core_1.Component({
                        selector: "join-chat",
                        //providers: [ChatService],
                        directives: [JoinChatComponent],
                        template: "\n    <div class=\"main-container\">\n        <div id=\"join\">\n            <form id=\"JoinForm\" class=\"form-inline text-right\">\n                <fieldset>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"inputValue\" placeholder=\"Enter your username\" autocomplete=\"off\" required autofocus />\n                  <button id=\"send\" class=\"btn btn-success\" (click)=\"joinChat()\">Join</button>\n                </fieldset>\n            </form>\n        </div>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [chat_service_1.ChatService])
                ], JoinChatComponent);
                return JoinChatComponent;
            }());
            exports_1("JoinChatComponent", JoinChatComponent);
        }
    }
});

//# sourceMappingURL=joinChat.component.js.map
