class Helpers {
    static _messages = []
    static _serverMessages = []
    static _killed = []

    static message(msg) {
        Helpers._messages.push(msg);
        //document.mrl.clientMessages = Helpers._messages;
      
    }

    static serverMessage(msg) {
      Helpers._serverMessages.push(msg);
      if (typeof document.io !== 'undefined'){
        document.io.emit('message', msg);
      }

    }

    

    static drawMessages()
    {
       
       let strMessages = "";

      for (let n=0;  n<this._messages.length; n++)
      {
        strMessages += this._messages[n] + "<br>";
      }
      document.getElementById('messages').innerHTML = strMessages;
      strMessages = "";

      for (let n=0;  n<this._serverMessages.length; n++)
      {
        strMessages += this._serverMessages[n] + "<br>";
      }

      document.getElementById("serverMessages").innerHTML = strMessages;

    }
    

    static addKilled(c)
    {
      Helpers._killed.push(c);
    }
    static logKilled()
    {
      for (let n=0; n < this._killed.length; n++)
        console.log(this._killed[n])
    }
}
export default Helpers;