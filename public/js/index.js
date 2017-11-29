let socket = io();



socket.on('connect', function() {
    console.log("connected to server");

    socket.on('newMessage', function (newMessage) {
        console.log("new message from server", newMessage);
    });
});

socket.on('disconnect', function() {
    console.log("server disconnected");
});

socket.on('newEmail', function (email) {
    console.log("new email", email);
});