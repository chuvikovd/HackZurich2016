import {User} from './User';

export class Message{
    body: string;
    user: User;


    constructor(body: string, user: User){
        this.body = body;
        this.user = user;
    }
}