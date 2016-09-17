System.register(['angular2/core', './mainChat.component', './joinChat.component', './chat.service'], function(exports_1, context_1) {
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
    var core_1, mainChat_component_1, joinChat_component_1, chat_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mainChat_component_1_1) {
                mainChat_component_1 = mainChat_component_1_1;
            },
            function (joinChat_component_1_1) {
                joinChat_component_1 = joinChat_component_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_chatService) {
                    this._chatService = _chatService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    //one component is created grab a reference to the server from the Chat Service
                    this.server = this._chatService.getServer();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        directives: [mainChat_component_1.MainChatComponent, joinChat_component_1.JoinChatComponent],
                        template: "\n    <div class=\"app-container\">\n    \n        <join-chat *ngIf=\"!server.joined\"></join-chat>\n        \n        <main-chat *ngIf=\"server.joined\"></main-chat>\n        \n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [chat_service_1.ChatService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
