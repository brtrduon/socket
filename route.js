const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/views/index.html');
    });

    app.get('/signup', (req, res) => {
        res.sendFile(__dirname + '/views/signup.html');
    });

    app.get('/login', (req, res) => {
        res.sendFile(__dirname + '/views/login.html');
    });

    app.post('/signup', Authentication.signup);

    app.post('/login', (req, res) => {

    });
}