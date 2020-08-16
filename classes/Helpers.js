class Helpers {
    static _messages = []
    static _killed = []

    static message(msg) {
        Helpers._messages.push(msg);

    }

    static drawMessages()
    {
       
       let strMessages = "";

      for (let n=0;  n<this._messages.length; n++)
      {
        strMessages += this._messages[n] + "<br>";
      }
      document.getElementById('messages').innerHTML = strMessages;
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