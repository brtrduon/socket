const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost/database');

const route = require('./route');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
route(app);


const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);

const socket = require('socket.io');
const io = socket(server);


console.log(`Localhost running on ${port}`);
// console.log(io);


io.on('connection', (socket) => {
    console.log('made socket connection,', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});