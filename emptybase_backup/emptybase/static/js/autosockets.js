
class AutoSocket {
    constructor() {
        this.socket = null;

        this.host = null;
        this.port = null;

        this.onLogin = null;
        this.onRecv = null;
        this.onOpen = null;
        this.onClose = null;
        this.onError = null;
        this.onAutoReconnect = null;

        this.userLogin = null;

        this.session = null;
        this.usr = null;
        this.auth = false;
        this.connected = false;

        this.authState = "";

        this.isAutoReconnecting = false;
        this.autoReconnectTries = 0;

        this.keepLoggedIn = false;
    }

    connect(host=null, port=null) {
      if (this.connected)
      {
        return
      }
      if (host != null && port != null)
      {
        this.host = host;
        this.port = port;
      }

      if (this.host == null || this.port == null)
      {
        console.log("AutoSocket Error: connect: not host/port given");
        return;
      }

      this.socket = new WebSocket('ws://' + this.host +':' + this.port);
      var that = this;

      this.socket.onopen = function() {that._onOpen();};
      this.socket.onmessage = function(e) {that._onRecv(e.data);};
      this.socket.onclose = function() {that._onClose();};
      this.socket.onerror = function() {that._onError();};
    }

    send(data)
    {
      if (this.auth)
      {
        this.socket.send(data);
      }
    }

    _onOpen() {
      this.connected = true;
      if (this.onOpen)
      {
        this.onOpen();
      }
      this.isAutoReconnecting = false;
      this.autoReconnectTries = 0;
      var result = this.loginSession();
      if (!result)
      {
        this._userLogin();
      }
    }

    _userLogin(failed=false) {
      if (this.userLogin)
      {
        this.userLogin(failed);
      }
    }

    _onLogin() {
      if (this.onLogin)
      {
        this.onLogin();
      }
    }

    _onRecv(data) {
      if (data === "ping")
      {
          this.socket.send('pong');
          return
      }


      if (this.auth === false) {
        data = JSON.parse(data);
        if ("authentication" in data)
        {
          if (data["authentication"])
          {
            console.log("LOGIN: Authenticated");

            this.session = data["session"];
            this.usr = data["user"];
            this.auth = true;
            this.authState = "";

            if (this.keepLoggedIn)
            {
              setCookie("session", this.session, 3);
            }
            else
            {
              delCookie("session");
            }
            this._onLogin();
            return
          }
          else
          {
            delCookie("session");
            this.session = null;
            this._userLogin(this.authState==="user");
          }
        }
        return
      }

      if (this.onRecv)
      {
        this.onRecv(data);
      }
    }

    _onClose()
    {
      console.log("closed");
      this.connected = false;

      this.isAutoReconnecting = false;

      if (!this.auth && this.authState !== "")
      {
        if (this.authState === "session")
        {
          this.session = null;
          delCookie("session")
        }
        this._userLogin(false);

        this.autoReconnect(true);
        this.authState = ""

      }
      else
      {
        this.autoReconnect();

        if (this.onClose)
        {
          this.auth = false;
          this.onClose();
        }
      }


    }

    autoReconnect(instant=false)
    {
        if (this.connected) return;

        if (instant)
        {
            if (this.isAutoReconnecting) {
                clearInterval(this.autoReconnectInterval);
                this.isAutoReconnecting = false;
            }

            console.log("autoReconnect instant");
            this.connect();
            return
        }
        if (this.isAutoReconnecting) return;



        if (this.autoReconnectTries > 20)
        {
            return
        }
        this.isAutoReconnecting = true;

        var delay = 1000 * (10*Math.pow(this.autoReconnectTries, 0.3)+0.2*this.autoReconnectTries+1);
        this.autoReconnectTries += 1;

        if (this.onAutoReconnect)
        {
            this.onAutoReconnect(delay);
        }

        var that = this;
        this.autoReconnectInterval = setTimeout(function() {that.connect()}, delay);
    }

    _onError() {
      if (this.onError)
      {
        this.onError();
      }
    }

    login(usr, key)
    {
      this.authState = "user";

      var encrypted_key = SHA512(key);
      this.socket.send('{"authentication":{"user":"' + usr + '", "key": "' + encrypted_key + '"}}');
    }

    loginSession()
    {
      if (this.session == null)
      {
          this.session = getCookie("session");

          if (this.session === "")
          {
            this.session = null;
            return false;
          }
      }

      if (this.session != null)
      {
        this.authState = "session";
        this.socket.send('{"authentication":{"session":"' + this.session + '"}}');
        return true;

      }
      return false;
    }
}
