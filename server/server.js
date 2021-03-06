/**
 * A simple ExpressJS server app
 */
/// <reference path="../typings/main.d.ts" />
'use strict';
var express = require('express');
var sockets_1 = require('./sockets');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = new sockets_1.Sockets(server);
app.use(express.static('client'));
app.use('/client', express.static('client'));
server.listen(port);
server.on('listening', function () {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

//# sourceMappingURL=server.js.map
