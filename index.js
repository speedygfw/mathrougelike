var app = require('express')();
var express = require('express');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

//app.use(app.static('public'));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

http.listen(80, () => {
  console.log('listening on *:80');
});



io.on('connection', (socket) => {
    socket.broadcast.emit('new connection')

    socket.on('chat message', (msg) => {
      console.log(msg);
      io.emit('chat message', msg);
    });
  });