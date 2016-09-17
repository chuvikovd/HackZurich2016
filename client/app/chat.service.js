System.register(['angular2/core', '../models/Message', "../models/User"], function(exports_1, context_1) {
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
    var core_1, Message_1, User_1;
    var ChatService;
    function getLocation(callback) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("testttt");
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            callback(pos);
        }, function (err) {
            console.log(err);
        }, {
            enableHighAccuracy: false,
            timeout: 60000,
            maximumAge: 60000
        });
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Message_1_1) {
                Message_1 = Message_1_1;
            },
            function (User_1_1) {
                User_1 = User_1_1;
            }],
        execute: function() {
            ChatService = (function () {
                function ChatService() {
                    var _this = this;
                    this.server = {
                        connected: false,
                        joined: false,
                    };
                    console.log("test");
                    this.socket = io(window.location.host);
                    this.getMessage$ = new core_1.EventEmitter;
                    this.getWelcomeMsg$ = new core_1.EventEmitter;
                    this.socket.on("connect", function () {
                        console.log("Connected to Chat Socket");
                        _this.server.connected = true;
                    });
                    this.socket.on("disconnect", function () {
                        console.log("Disconnected from Chat Socket");
                    });
                    this.socket.on("welcome", function (user) {
                        console.log("Received welcome message: ", user.name);
                        //this.getWelcomeMsg$.emit(user);
                        _this.server.joined = true;
                        _this.user = user;
                    });
                    this.socket.on("message", function (message) {
                        console.log(message);
                        console.log("Message received: " + message.body + ", from {" + message.user.lat + ", " + message.user.long + "}");
                        _this.getMessage$.emit(message);
                    });
                }
                ChatService.prototype.getServer = function () {
                    return this.server;
                };
                ChatService.prototype.sendMessage = function (message) {
                    this.socket.emit("message", new Message_1.Message(message, this.user));
                    console.log("Sending message: " + message);
                };
                ChatService.prototype.joinChat = function (name) {
                    var self = this;
                    console.log("test log");
                    getLocation(function (pos) {
                        console.log("test emit");
                        self.socket.emit("join", new User_1.User(name, pos.lat, pos.lng));
                        console.log("Joining chat with username: " + name + " from " + pos.lat + " " + pos.lng);
                    });
                };
                ChatService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ChatService);
                return ChatService;
            }());
            exports_1("ChatService", ChatService);
        }
    }
});

//# sourceMappingURL=chat.service.js.map
