/**
 * A simple ExpressJS server app
 */
/// <reference path="../typings/main.d.ts" />

'use strict';

import express = require('express');
import http = require('http');
import path = require('path');
import {Sockets} from './sockets';

const app = express();
const server = require('http').Server(app);
const port : number = process.env.PORT || 3000;
const io = new Sockets(server);


app.use(express.static('client'));
app.use('/client', express.static('client'));

server.listen(port);
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
