'use strict';
const { User } = require('../models');
const { encodeToken } = require('../utils');

exports.register = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const { name, email } = user;
            const token = encodeToken({ name, email });
            return res.status(201).json({
                status: 201,
                token
            });
        }
    });
}

exports.login = (req, res) => {
    const { name, password } = req.body;
    User.findOne({
        name
    }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'an error occurred' });
        } else if (user && user.comparePassword(password)) {
            const { name, email } = user;
            const token = encodeToken({ name, email });
            return res.json({
                status: 200,
                token
            });
        } else {
            return res.json({
                status: 401,
                message: 'invalid name/password'
            });
        }
    });
}
