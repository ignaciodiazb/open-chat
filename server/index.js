const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
require('dotenv').config();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).send('<p>Open Chat API</p>');
});

createSocket(server);

function createSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL
    }
  });
  let nicknames = [];

  io.use((socket, next) => {
    const nickname = socket.handshake.auth.nickname;
    if (!nickname) {
      return next(new Error('invalid nickname'));
    } else if (nicknames.find(n => n === nickname)) {
      const err = new Error('Invalid nickname');
      err.message = 'Sorry. This nickname is already taken. Please choose another.';
      return next(err);
    }
    socket.nickname = nickname;
    next();
  });

  io.on('connection', (socket) => {
    nicknames.push(socket.nickname);
    let users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        id,
        nickname: socket.nickname,
      });
    }

    io.to(socket.id).emit('get-users', users);

    // Notify connected users when a new user connects (the new user is excluded)
    socket.broadcast.emit('new-user-connected', {
      id: socket.id,
      nickname: socket.nickname,
    });

    socket.on('send-public-message', (newMessage) => {
      socket.broadcast.emit('received-public-message', newMessage);
    });

    socket.on('send-private-message', (newPrivateMessage) => {
      io.to(newPrivateMessage.recipient).emit('received-private-message', newPrivateMessage);
    });

    socket.on('disconnect', () => {
      nicknames = nicknames.filter(n => n !== socket.nickname);
      socket.broadcast.emit('user-disconnected', {
        id: socket.id
      });
    });
  });
}

server.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});