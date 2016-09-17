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

Client.onWelcome = function (user, msgs) {
    console.log("Received welcome message", user);
    this.joined = true;
    this.user = user;
    for (var m of msgs.reverse()) {
        console.log(m);
        addToHistory(m);
    }

    var mapDiv = document.getElementById("map");

    map = new google.maps.Map(mapDiv, {
        center: new Position(user.lat, user.long),
        zoom: 15,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false
    });
};

Client.onMessage = function (message) {
    console.log("Received message", message);
    console.log(message.user.lat, message.user.long);
    customMarker(map, message);
    addToHistory(message);
};

Client.sendMessage = function (message) {
    console.log("Sending message", message);
    console.log("Sending user", this.user);
    this.socket.emit("message", { body: message, user: this.user });
};

Client.joinChat = function (name) {
    var self = this;
    var geoOptions = $('#demoOptions').val();
    var lat, long;
    switch (+geoOptions) {
        case 0: {
            getAccurateLocation(function (pos) {
                var usr = { name: name, lat: pos[0], long: pos[1] };
                self.socket.emit("join", usr)
            })
            break;
        }
        case 1: {
            lat = 47.389834; long = 8.516381;
            break;
        }
        case 2: {
            lat = -33.791985; long = 151.287733;
            break;
        }
        case 3: {
            lat = 56.944280; long = 24.080433;
            break;
        }
        case 4: {
            lat = 42.406028; long = 12.850243;
            break;
        }
    }
    if (geoOptions != 0) {
        var usr = { name: name, lat: lat, long: long };
        console.log(usr);
        self.socket.emit("join", usr)
    }
};

function addToHistory(msg) {
    $(".history-container").append('<div class="history-item">' +
        '<span class="author">' + msg.user.name + ':</span>' +
        '<p class="msg">' + msg.body + '</p>' +
        '</div>');
    $('.history-container').scrollTop($('.history-container')[0].scrollHeight)
}