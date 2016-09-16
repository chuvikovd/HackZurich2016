/**
 * A simple ExpressJS server app
 */
/// <reference path="../typings/main.d.ts" />

'use strict';

import express = require('express');
import http = require('http');
import path = require('path');
import socketio = require('socket.io');

const app = express();
const server = require('http').Server(app);
const port : number = process.env.PORT || 3000;
const io = socketio(server);


io.on('connection', function(socket){
    console.log('A user connected');

    socket.once('disconnect', function () {
        console.log('A user disconnected');
    });
});

app.use(express.static('client'));
app.use('/client', express.static('client'));

server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
