import * as loki from 'lokijs';
import {Message} from '../client/models/Message';
import {User} from '../client/models/User';

export class Database {
    db: any;
    messages: any;


    constructor(callback) {
        this.db = new loki('data/data.json');

        this.db.loadDatabase({}, () => {
            let messages = this.db.getCollection('messages');
            if (!messages) {
                console.log('adding new collection');
                this.messages = this.db.addCollection('messages');
            } else {
                console.log('found existing collection');
                this.messages = messages;
            }
            this.save();
            console.log('DB LOADED');
            callback();
        });

    }

    addMessage = (message: Message) => {
        this.messages.insert(message);
        this.save();
    }

    getMessages = (lat: number, long: number, latX: number, longX: number) => {
        let msg = this.messages.where((msg: Message) => {
            return (msg.user.lat >= lat-latX &&
                    msg.user.lat <= lat+latX &&
                    msg.user.long >= long-longX &&
                    msg.user.long <= long+longX);
        });

        return msg;
    }

    save = () => {
        this.db.saveDatabase();
    }

}