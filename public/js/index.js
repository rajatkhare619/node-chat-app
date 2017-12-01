let socket = io();



socket.on('connect', function() {
    console.log("connected to server");

    socket.on('newMessage', function (newMessage) {
        console.log("new message from server", newMessage);
        let li = $('<li></li>');
        li.text(`${newMessage.from}: ${newMessage.text}`)
        $('#messages').append(li);
    });
});

socket.on('disconnect', function() {
    console.log("server disconnected");
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: "user",
        text: $('[name=message]').val()
    }, function () {
         console.log("form acknowledged");
    });
});