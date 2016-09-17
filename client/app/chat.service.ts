import {Injectable, EventEmitter} from 'angular2/core';
import { Message } from '../models/Message'
import { User } from "../models/User";

export interface Server {
    connected: boolean,
    joined: boolean
}

@Injectable()
export class ChatService {
    socket;
    user;

    getMessage$: EventEmitter<any>;
    getWelcomeMsg$: EventEmitter<any>;


    server:Server = {
        connected: false,
        joined: false,
    };

    getServer(){
        return this.server;
    }

    constructor() {

        console.log("test");
        this.socket = io(window.location.host);

        this.getMessage$ = new EventEmitter;

        this.getWelcomeMsg$ = new EventEmitter;


        this.socket.on("connect", () => {
            console.log("Connected to Chat Socket");
            this.server.connected = true;
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from Chat Socket");
        });

        this.socket.on("welcome", (user) => {
            console.log("Received welcome message: ", user.name);
            //this.getWelcomeMsg$.emit(user);
            this.server.joined = true;
            this.user = user;
        });

        this.socket.on("message", (message: Message) => {
            console.log(message);
            console.log("Message received: " + message.body + ", from {" + message.user.lat +", " + message.user.long + "}");
            this.getMessage$.emit(message);
        });

    }

    sendMessage(message) {
        this.socket.emit("message", new Message (message, this.user) );
        console.log("Sending message: " + message);
     }

    joinChat(name) {
        var self = this;
        console.log("test log");
        getLocation(function(pos){
            console.log("test emit");
            self.socket.emit("join", new User (name, pos.lat, pos.lng) );
            console.log("Joining chat with username: " + name + " from " + pos.lat + " " + pos.lng);
        });
    }


}

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("testttt");
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        callback(pos);
    }, function(err){
        console.log(err);
        },
        {
            enableHighAccuracy: false,
            timeout: 60000,
            maximumAge: 60000
        })}