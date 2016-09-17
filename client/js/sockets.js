// var socket = io.connect("https://chathack.herokuapp.com");
var socket = io(document.location.host);

Client.connect(socket);

socket.on("connect", Client.onConnect);

socket.on("disconnect", Client.onDisconnect);

socket.on("welcome", function (receive) {
    console.log('hihihihih');
    Client.onWelcome(receive.user, receive.msgs);
});

socket.on("message", Client.onMessage);