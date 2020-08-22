var app = require('express')();
var express = require('express');
const { disconnect } = require('process');



var http = require('http').createServer(app);
var io = require('socket.io')(http);

//app.use(app.static('public'));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

http.listen(process.env.PORT || 80, () => {
  console.log('listening on ' + (process.env.PORT || 80));

});

var numUsers = 0;
var users = [];
var messages = [];

findUser = function(id){
  for(let n=0; n<users.length; n++)
    if(users[n].id == id)
      return users[n];
  
  return null;
}

disconnectUser = function(id){

  for(let n=0; n<users.length; n++)
    if(users[n].id == id)
    {
      users.splice(n, 1);
        return;
    }

}
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);
    socket.broadcast.emit('users', users);
    //io.emit('users', users);
    

    socket.on('chat message', (r) => {
      let u = findUser(socket.id);
      if (u == null) {
        console.log(socket.id + " not found. User is not logged in.");
        return;
      }
      console.log(r.nickname + " sends " + r.msg);
      console.log(r);
      let o = {'nickname': r.nickname, 'msg': r.msg}
      messages.push(o);
      io.emit('chat message', o);
    });
    socket.on('message', (msg) => {
      let r = findUser(socket.id);
      if (r == null)
      {
        console.log(socket.id + " not found. User is not logged in.");
        return;
      }
      let o = {"id": r.id, "nickname": r.nickname, "msg": msg}
      socket.broadcast.emit('serverMessage', o);

      console.log(r.nickname + " sends " + msg);
      console.log(r);
      //let o = {'nickname': r.nickname, 'msg': r.msg}
      //messages.push(o);
      //io.emit('chat message', o);
    });

    socket.on('login', (nickname) => {
      console.log(nickname + ' logged in.');
      io.emit('loginAccepted', socket.id);
      let o = {'id': socket.id, 'nickname': nickname};
      users.push(o);
      io.emit('users', users);
      o.msg = nickname + " entered the game.";
      socket.broadcast.emit('serverMessage', o);

      
      console.log(users);
    });



    socket.on('disconnect', () => {
      disconnectUser(socket.id);


      socket.broadcast.emit('users', users);
      console.log(`Socket ${socket.id} disconnected.`);
      console.log(users);
    });

  });