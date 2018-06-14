const Authentication = require('./controllers/authentication');
const Admin = require('./controllers/admin');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});



module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });

    app.get('/signin', function(req, res) {
        res.sendFile(__dirname + '/views/signin.html');
    });

    app.get('/signup', function(req, res) {
        res.sendFile(__dirname + '/views/signup.html');
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
    
}