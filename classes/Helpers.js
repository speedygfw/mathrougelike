class Helpers {
    static _messages = []

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
}
export default Helpers;