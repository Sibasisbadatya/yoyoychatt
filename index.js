const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

//ending of declaration
//starting of http and socket.io methods


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chatt.html');
});
http.listen(port, () => {
    console.log(`listening to ${port}`);
});

//socket functiom part


io.on('connection', (socket) => {
    console.log("a user is connected");
    socket.on('disconnect', () => {
        console.log("a user disconnected");
    });
    socket.on("userjoined", (name) => {
        socket.broadcast.emit("nameappend", name);
    }
    );

    socket.on('message', (value, username) => {
        console.log("message : " + value);
        socket.broadcast.emit('message', value, username);
    });
});
