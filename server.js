const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const route = require('./route');

mongoose.connect('mongodb://localhost/kitchen')
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
route(app);

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log(`Localhost running on port ${port}`);