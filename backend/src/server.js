const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};


mongoose.connect('mongodb://omnistack:V36231158@omnistack-shard-00-00-ugdst.mongodb.net:27017,omnistack-shard-00-01-ugdst.mongodb.net:27017,omnistack-shard-00-02-ugdst.mongodb.net:27017/semana9?ssl=true&replicaSet=OmniStack-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id
});


app.use((req, res , next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})
// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar routes params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação e edição de registro)
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);