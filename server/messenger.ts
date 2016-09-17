import {Message} from '../client/models/Message';
import {User} from '../client/models/User';
import {Database} from './database';

export class Messenger {
    history: Array<Message>;
    io: SocketIO.Server;
    test: string;
    users: Array<User> = [];
    db: Database;

    constructor(io: SocketIO.Server) {
        this.io = io;
        this.db = new Database(() => {});        
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
        this.db.addMessage(message);
        this.io.emit('message', message);
    };

    join = (user: User, socket: SocketIO.Socket) => {
        let {latX, longX} = mdToLatLong(10000, user.lat, user.long);
        let msgs = this.db.getMessages(user.lat, user.long, latX, longX);
        socket.emit('welcome', user, msgs);
        user.socket = socket;
        this.users.push(user);
        console.log(`${user.name} connected`);
    };
}

function findUserBySocket(arr: Array<User>, socket: SocketIO.Socket): User {
    return arr.filter(u => u.socket === socket)[0];
}

//Meters in diameter to latitude and longitude
function mdToLatLong(meters: number, latitude: number, longitude: number){
    let km = meters/1000;
    let latX = (1/110.574)*km;
    let longX = (1/(111.320*Math.cos(latitude)))*km;
    return {latX, longX};
}