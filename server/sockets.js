"use strict";
var Messenger_1 = require('./Messenger');
var Sockets = (function () {
    function Sockets(server) {
        var io = require('socket.io').listen(server);
        var messenger = new Messenger_1.Messenger(io);
        io.on('connection', function (socket) {
            console.log('new conn!');
            socket.on('join', function (user) {
                messenger.join(user, socket);
            });
            socket.on('message', messenger.receive);
            socket.once('disconnect', messenger.disconnect);
        });
        return io;
    }
    return Sockets;
}());
exports.Sockets = Sockets;
;

//# sourceMappingURL=sockets.js.map
