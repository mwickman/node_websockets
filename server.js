"use strict";
var io = require('socket.io');
var express = require('express')
var app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server, {'log level': 1});

server.listen(8000);

app.configure(function () {
  app.use(express.static(__dirname + '/lib'));
//  app.use(express.cookieParser());
//  app.use(express.bodyParser());
//  app.use(express.session({ secret: 'secretkey-here-from-env' }));
//  app.use(passport.initialize());
//  app.use(passport.session());
//  app.use(app.router);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

//io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//  socket.on('count', function(data){
//    "use strict";
//    console.log(data);
//  })
//});
//
//io.sockets.on('connection', function (socket) {
//  socket.on('ferret', function (name, fn) {
//    console.log(name);
//    fn('woot');
//  });
//});

var chat = io.of('/chat');

chat.on('connection', function(socket){
  console.log('chat connected')

  socket.on('msg', function(data){
    console.log('got message!', data)
    chat.emit('msg', data)
  })

});

