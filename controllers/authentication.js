const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function token(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
        }, config.secret
    );
};

exports.signin = function(req, res, next) {
    res.send({ token: token(req.user) });
}

exports.signup = function(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (!username || !email || !password || !confirm_password) {
        return res.status(422).send({ error: 'Fields cannot be blank'});
    }
    User.findOne({ username: username }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({ err: 'Email and/or Username already in use'});
        }
        const user = new User({
            username: username,
            email: email,
            password: password
        });
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json({ token: token(user) });
        });
    });
}