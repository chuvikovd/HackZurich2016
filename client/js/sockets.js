var socket = io(window.location.host);

Client.connect(socket);

socket.on("connect", Client.onConnect);

socket.on("disconnect", Client.onDisconnect);

socket.on("welcome", function (usr) {
    console.log('hihihihih');
    Client.onWelcome(usr);
});

socket.on("message", Client.onMessage);