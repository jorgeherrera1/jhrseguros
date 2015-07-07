'use strict';

var express = require('express'),
    serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    serverIp = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    app = express();

app.use(express.static('dist'));

app.listen(serverPort, serverIp, function () {
    console.log( "Listening on " + serverIp + ", port " + serverPort);
});