$(function () {
    var socket = io();
    document.io = socket;
    
    $('#chatArea').hide();
    
    $('#chatForm').submit(function(e){
      e.preventDefault(); // prevents page reloading
      let message=$('#m').val();
      if (message.length < 2)
        return false;
      
      let o = {"nickname": $('#nickname').val(), "msg": message}
      socket.emit('chat message', o);
      $('#m').val('');
      return false;
    });
    $('#loginForm').submit(function(e){
      e.preventDefault(); // prevents page reloading
      let nickname=$('#nickname').val();
      if (nickname.length < 2)
      {
        alert("nickname length should be >= 2.");
        return false;
      }
      document.nickname = nickname;
      if (typeof document.mrl.player !== 'undefined'){
        document.mrl.player.setName(nickname);
        document.mrl.gameScreen.renderStats();
      }
      socket.emit('login', nickname);
      $('#m').val('');
      return false;
    });

    socket.on('loginAccepted', function(id){
      document.socketId = id;
      $('#chatArea').show();
      $('#loginForm').hide();

    });

    socket.on('users', function(users){
        console.log("numUsers:" + users.length)
        let el = document.getElementById("numUsers");
        el.innerHTML="<b>Users: <b>" + users.length;
        document.users = users;
    });

    socket.on('chat message', function(r){
      let el = document.getElementById("chat");
      console.log(r);
      $(el).append(r.nickname + '->' + r.msg + '<br>');
      
    });
  });