var Client = {
    connected: false,
    joined: false,
    user: {},
    socket: {}
};

Client.connect = function (socket) {
    this.socket = socket;
};

Client.onConnect = function () {
    console.log("Connected to chat Socket");
    this.connected = true;
};

Client.onDisconnect = function () {
    console.log("Disconnected from chat Socket");
    this.connected = false;
};

Client.onWelcome = function (user) {
    console.log("Received welcome message", user);
    this.joined = true;
    this.user = user;
};

Client.onMessage = function (message) {
    console.log("Received message", message);
    console.log(message.user.lat, message.user.long);
    customMarker(map, new Position(message.user.lat, message.user.long), message.body);
};

Client.sendMessage = function (message) {
    console.log("Sending message", message);
    console.log("Sending user", this.user);
    this.socket.emit("message", {body: message, user: this.user});
};

Client.joinChat = function (name) {
    var self = this;
    getAccurateLocation(function (pos) {
        var usr = {name: name, lat: pos[0], long: pos[1]};
        console.log(usr);
        self.socket.emit("join", usr)
    })
};