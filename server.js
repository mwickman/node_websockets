"use strict";
var port = process.env.PORT || 8000
var io = require('socket.io');
var express = require('express')
var app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server, {'log level': 1});

server.listen(port);

app.configure(function () {
  app.use(express.static(__dirname + '/lib'));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var Message = function(text, sender) {
  this.text = text;
  this.time = new Date().toLocaleTimeString();
  this.sender = sender;
}

var ChatLog = function() {
  this.log = [];
}

ChatLog.prototype.addMsg = function(message) {
  this.log.push(message);
  if (this.log.length > 50) {this.log.pop()}
  console.log('log is now', this.log.length);
}


var chat = io.of('/chat');
var msgLog = new ChatLog();

chat.on('connection', function(socket){
  console.log('chat connected')
  socket.emit('log', msgLog.log);

  socket.on('msg', function(data){
    console.log('got message!', data)
    var msg = new Message(data, "");
    msgLog.addMsg(msg);
    chat.emit('msg', msg)
  })

});
