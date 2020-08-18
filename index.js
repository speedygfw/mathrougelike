var app = require('express')();
var express = require('express');



var http = require('http').createServer(app);
var io = require('socket.io')(http);

//app.use(app.static('public'));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

http.listen(process.env.PORT | 80, () => {
  console.log('listening on ' + (process.env.PORT | 80));

});

var numUsers = 0;


io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);
    ++numUsers;
    socket.broadcast.emit('numUsers', numUsers);

    socket.on('chat message', (msg) => {
      console.log(msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      --numUsers;
      socket.broadcast.emit('numUsers', numUsers);
      console.log(`Socket ${socket.id} disconnected.`);
    });

  });