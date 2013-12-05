"use strict";
var io = require('socket.io');
var express = require('express')
var app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server, {'log level': 1});

server.listen(8000);

app.configure(function () {
  app.use(express.static(__dirname + '/lib'));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


var chat = io.of('/chat');

chat.on('connection', function(socket){
  console.log('chat connected')

  socket.on('msg', function(data){
    console.log('got message!', data)
    chat.emit('msg', data)
  })

});

