import {User} from './User';

export class Message{
    lat: number;
    long: number;

    body: string;
    time: string;
    author: User;

    constructor(body: string, time: string, author?: User){
        this.body = body;
        this.time = time;
        this.author = author;
    }
}