import {Messenger} from './Messenger';
import {Message} from '../client/models/Message'

export class Sockets {
    constructor(server: any) {
        let io = require('socket.io').listen(server);
        const messenger = new Messenger(io);

        io.on('connection', function (socket) {
            console.log('new conn!');

            socket.on('join', (user) => {
                messenger.join(user, socket);
            });


            socket.on('message', function (lat : number, lng : number, data : string) {
                console.log(lat, lng, data);
                socket.emit('msg', new Message(lat, lng, data))
            });

            socket.once('disconnect', messenger.disconnect);
        });

        return io;
    }
};