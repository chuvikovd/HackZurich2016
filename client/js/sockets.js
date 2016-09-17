// var socket = io.connect("https://chathack.herokuapp.com");
var socket = io(document.location.host);

Client.connect(socket);

socket.on("connect", Client.onConnect);

socket.on("disconnect", Client.onDisconnect);

socket.on("welcome", function (usr) {
    console.log('hihihihih');
    Client.onWelcome(usr);
});

socket.on("message", Client.onMessage);