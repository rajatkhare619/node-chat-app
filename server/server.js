const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
console.log("new user connected");

socket.emit('newMessage', {
    from: "admin",
    text: "welcome rajat",
    createdAt: new Date().getTime()
});

socket.broadcast.emit('newMessage', {
    from: "admin",
    text: "rajat joined",
    createdAt: new Date().getTime()
});

    socket.on('createMessage', (newMessage) => {
        console.log("newMessage event", newMessage);
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
        /*socket.broadcast.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});
server.listen(port, () => {
    console.log("server running on port", port);
});