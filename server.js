// if dependencies only need to be added once, then we can add them directly into server.js 
// otherwise, if dependencies are to be used more than once, then we add them into container.js and call them later on

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');

// call stuff inside container.js
container.resolve(function(users) {
    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(8000, () => {
            console.log('Listening on port 8000');
        });
        ConfigureExpress(app);

        // setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);
    
        app.use(router);
    }


    function ConfigureExpress(app) {
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
            })
        );
    }
});