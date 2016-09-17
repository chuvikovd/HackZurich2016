import {Messenger} from './messenger';
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


            socket.on('message', messenger.receive);

            socket.once('disconnect', messenger.disconnect);
        });

        return io;
    }
};