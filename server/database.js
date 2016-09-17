"use strict";
var loki = require('lokijs');
var Database = (function () {
    function Database(callback) {
        var _this = this;
        this.addMessage = function (message) {
            _this.messages.insert(message);
            _this.save();
        };
        this.getMessages = function (lat, long, latX, longX) {
            var msg = _this.messages.where(function (msg) {
                return (msg.user.lat >= lat - Math.abs(latX) &&
                    msg.user.lat <= lat + Math.abs(latX) &&
                    msg.user.long >= long - Math.abs(longX) &&
                    msg.user.long <= long + Math.abs(longX));
            });
            return msg;
        };
        this.save = function () {
            _this.db.saveDatabase();
        };
        this.db = new loki('data/data.json');
        this.db.loadDatabase({}, function () {
            var messages = _this.db.getCollection('messages');
            if (!messages) {
                console.log('adding new collection');
                _this.messages = _this.db.addCollection('messages');
            }
            else {
                console.log('found existing collection');
                _this.messages = messages;
            }
            _this.save();
            console.log('DB LOADED');
            callback();
        });
    }
    return Database;
}());
exports.Database = Database;

//# sourceMappingURL=database.js.map
