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
            //TODO: DB save
            console.log(message);
            _this.io.emit('message', message);
        };
        this.join = function (user, socket) {
            socket.emit('welcome', user);
            user.socket = socket;
            _this.users.push(user);
            console.log(user.name + " connected");
        };
        this.io = io;
        this.db = new database_1.Database(function () {
            //console.log(this.db.getMessages(10, 10, 5), 'close msg');
        });
        console.log(mdToLatLong(100, 100, 50));
        console.log(mdToLatLong(200, 50, 100));
        console.log(mdToLatLong(1000, 0, 0));
        console.log(mdToLatLong(100, 20, 20));
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
