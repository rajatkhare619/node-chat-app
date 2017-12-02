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

socket.on('newLocationMessage', function (message) {
    let li = $('<li></li>');
    let a = $('<a target="_blank">current location</a>')

    li.text(`${message.from}: `);
    a.attr('href',  message.url);
    li.append(a);
    $('#messages').append(li);
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

let locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("geolocation not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (error) {
        alert(error);
    });
});