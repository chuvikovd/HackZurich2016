import {Message} from '../client/models/Message';
import {User} from '../client/models/User';
import {Database} from './Database';

export class Messenger {
    history: Array<Message>;
    io: SocketIO.Server;
    test: string;
    users: Array<User> = [];
    db: Database;

    constructor(io: SocketIO.Server) {
        this.io = io;
        this.db = new Database(() => {
            console.log(this.db.getMessages(10, 10, 5), 'close msg');
        });
    };

    disconnect = (socket: SocketIO.Socket) => {
        let user = findUserBySocket(this.users, socket);
        let index = this.users.indexOf(user);
        if (index > -1) {
            this.users.splice(index);
            this.io.emit('left', user);
            this.io.emit('online', this.users);
        }
        console.log(`${socket.id} disconnected!`);
    };

    receive = (message: Message) => {
        //TODO: DB save
        console.log(message);
        this.io.emit('message', message);
    };

    join = (user: User, socket: SocketIO.Socket) => {
        user.socket = socket;
        user.socket.emit('welcome', new Message(`Hello ${user.name} !`, new Date().toTimeString(), this.admin));
        this.io.emit('joined', user);
        this.users.push(user);
        console.log(`${user.name} connected`);
    };
}

function findUserBySocket(arr: Array<User>, socket: SocketIO.Socket): User {
    return arr.filter(u => u.socket === socket)[0];
}