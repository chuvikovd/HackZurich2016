import {User} from './User';

export class Message{
    latitude: number;
    longitude: number;

    body: string;
    time: string;
    author: User;

    constructor(body: string, time: string, author: User){
        this.body = body;
        this.time = time;
        this.author = author;
    }
}