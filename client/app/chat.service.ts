import {Injectable, EventEmitter} from 'angular2/core';
import { Message } from '../models/Message'
import { User } from "../models/User.js";

export interface Server {
    connected: boolean,
    joined: boolean
}

@Injectable()
export class ChatService {
    socket;

    getMessage$: EventEmitter<any>;

    server:Server = {
        connected: false,
        joined: false,
    };

    getServer(){
        return this.server;
    }

    constructor() {
        this.socket = io(window.location.host);

        this.getMessage$ = new EventEmitter;

        this.socket.on("connect", () => {
            console.log("Connected to Chat Socket");
            this.server.connected = true;
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from Chat Socket");
        });

        this.socket.on("welcome", (msg) => {
            console.log("Received welcome message: ", msg);
            this.server.joined = true;
        });

        this.socket.on("msg", (message: Message) => {
            console.log(message);
            console.log("Message received: " + message.body + ", from {" + message.lat +", " + message.lng + "}");
            this.getMessage$.emit(message);
        });

    }

    sendMessage(message) {
        getLocation((pos) => {
            this.socket.emit("message", pos.lat, pos.lng, message );
            console.log("Sending message: " + message + " from " + pos.lat + " " + pos.lng);
        });
     }

    joinChat(name) {
        getLocation((pos) => {
            this.socket.emit("join", new User (name, pos.lat, pos.lng) );
            console.log("Joining chat with username: " + name + " from " + pos.lat + " " + pos.lng);
        });
    }


}

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        callback(pos);
    })}