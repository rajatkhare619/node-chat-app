let socket = io();

function scrollToBottom() {
let messages = $('#messages');
let newMessage = messages.children('li:last-child');
let clientHeight = messages.prop('clientHeight');
let scrollTop = messages.prop('scrollTop');
let scrollHeight = messages.prop('scrollHeight');
let newMessageHeight = newMessage.innerHeight();
let lastMessageHeight = newMessage.prev().innerHeight();
if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
}
}

socket.on('connect', function() {
    console.log("connected to server");

    socket.on('newMessage', function (newMessage) {
        console.log("new message from server", newMessage);
        let formattedTime = moment(newMessage.createdAt).format('h:mm a');
        let template = $('#message-template').html();
        let html = Mustache.render(template, {
            text: newMessage.text,
            from: newMessage.from,
            createdAt: formattedTime
        });
        $('#messages').append(html);
        scrollToBottom();
        /*let formattedTime = moment(newMessage.createdAt).format('h:mm a');
        let li = $('<li></li>');
        li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`)
        $('#messages').append(li);*/
    });
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });
    $('#messages').append(html);
    scrollToBottom();
   /* let li = $('<li></li>');
    let a = $('<a target="_blank">current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href',  message.url);
    li.append(a);
    $('#messages').append(li);*/
});

socket.on('disconnect', function() {
    console.log("server disconnected");
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();
let messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: "user",
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
        console.log("form acknowledged");
    });
});

let locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("geolocation not supported by your browser");
    }
    locationButton.attr('disabled', 'disabled').text("Sending location...");

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("Send location");

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (error) {
        locationButton.removeAttr('disabled').text("Send location");
        alert(error);
    });

});