var app = require('express')();
var express = require('express');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

//app.use(app.static('public'));
var numUsers=0;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

http.listen(process.env.PORT | 80, () => {
  console.log('listening on ' + (process.env.PORT | 80));
});



io.on('connection', (socket) => {
    ++numUsers;
    console.log("user connected...");
    //socket.broadcast.emit('users', numUsers);


    socket.on('chat message', (msg) => {
      console.log(msg);
      io.emit('chat message', msg);
    });
  });

  io.on('disconnect', () => {
     --numUsers;
    console.log("user leaves...");
  });
