const jwt = require('jwt-simple');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const username = req.body.username,
    email = req.body.email,
    password = req.body.password;
}