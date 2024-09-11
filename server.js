const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://sasak.xyz", // Ganti dengan domain frontend Anda
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.static('public')); // Untuk melayani file statis jika diperlukan

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
        console.log('Message received: ', data);
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Socket.IO server running on port 3000');
});
