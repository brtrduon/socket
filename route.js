const Authentication = require('./controllers/authentication');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});



module.exports = function(app) {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/views/index.html');
    });

    app.get('/index', (req, res) => {
        res.sendFile(__dirname + '/views/index1.html');
    });

    app.get('/signin', (req, res) => {
        res.sendFile(__dirname + '/views/signin.html');
    });

    app.get('/signup', (req, res) => {
        res.sendFile(__dirname + '/views/signup.html');
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
    
}