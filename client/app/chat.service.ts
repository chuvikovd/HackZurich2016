import {Injectable} from 'angular2/core';

@Injectable()
export class ChatService {
    socket;

    constructor() {
        this.socket = io(window.location.host);

        this.socket.on("connect", () => {
            console.log("Connected to Chat Socket");
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from Chat Socket");
        });

        this.socket.on("message", (msg) => {
            console.log("Message received: " + msg);
        });

    }

    sendMessage(message) {
        getLocation((pos) => {
            console.log(pos.lat);
            this.socket.emit("message", message );
            console.log("Sending message: ", message);
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