const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const io = require('socket.io');

mongoose.connect('mongodb://localhost/database');

const route = require('./route');
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
route(app);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
io(server);
server.listen(port);
console.log(`Localhost running on ${port}`);
console.log(io(server));