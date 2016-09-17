import {Injectable, EventEmitter} from 'angular2/core';
import { Message } from '../models/Message'

@Injectable()
export class ChatService {
    socket;

    getMessage$: EventEmitter<any>;


    constructor() {
        this.socket = io(window.location.host);

        this.getMessage$ = new EventEmitter;

        this.socket.on("connect", () => {
            console.log("Connected to Chat Socket");
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from Chat Socket");
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


}

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        callback(pos);
    })}