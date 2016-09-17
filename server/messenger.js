"use strict";
var database_1 = require('./database');
var Messenger = (function () {
    function Messenger(io) {
        var _this = this;
        this.users = [];
        this.disconnect = function (socket) {
            var user = findUserBySocket(_this.users, socket);
            var index = _this.users.indexOf(user);
            if (index > -1) {
                _this.users.splice(index);
                _this.io.emit('left', user);
                _this.io.emit('online', _this.users);
            }
            console.log(socket.id + " disconnected!");
        };
        this.receive = function (message) {
            _this.db.addMessage(message);
            console.log(message.user);
            _this.io.emit('message', message);
        };
        this.join = function (user, socket) {
            var _a = mdToLatLong(10000, user.lat, user.long), latX = _a.latX, longX = _a.longX;
            var msgs = _this.db.getMessages(user.lat, user.long, latX, longX);
            socket.emit('welcome', { user: user, msgs: msgs });
            user.socket = socket;
            _this.users.push(user);
            console.log(user.name + " connected");
        };
        this.io = io;
        this.db = new database_1.Database(function () { });
    }
    ;
    return Messenger;
}());
exports.Messenger = Messenger;
function findUserBySocket(arr, socket) {
    return arr.filter(function (u) { return u.socket === socket; })[0];
}
//Meters in diameter to latitude and longitude
function mdToLatLong(meters, latitude, longitude) {
    var km = meters / 1000;
    var latX = (1 / 110.574) * km;
    var longX = (1 / (111.320 * Math.cos(latitude))) * km;
    return { latX: latX, longX: longX };
}

//# sourceMappingURL=messenger.js.map
