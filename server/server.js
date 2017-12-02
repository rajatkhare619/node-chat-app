const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
console.log("new user connected");

socket.emit('newMessage', generateMessage("admin", "welcome to the chat app"));

socket.broadcast.emit('newMessage',generateMessage("admin", "new user joined"));

    socket.on('createMessage', (newMessage, callback) => {
        console.log("newMessage event", newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
        /*socket.broadcast.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('rat', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});
server.listen(port, () => {
    console.log("server running on port", port);
});