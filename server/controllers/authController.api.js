'use strict';
const { User } = require('../models');
const { encodeToken } = require('../utils');
const expressJwt = require('express-jwt');

exports.register = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const { name, email, _id } = user;
            const token = encodeToken({ name, email, _id });
            return res.status(201).json({
                status: 201,
                token,
                user: {
                    _id,
                    name,
                    email
                }
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
            const { name, email, _id } = user;
            const token = encodeToken({ name, email, _id });
            res.cookie('t', token, { expire: new Date() + 9999 });
            return res.json({
                status: 200,
                token,
                user: {
                    _id,
                    name,
                    email
                }
            });
        } else {
            return res.json({
                status: 401,
                message: 'invalid name/password'
            });
        }
    });
}

exports.userById = (req, res, next, id) => {
    console.log('userId', id)
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth.payload._id && req.profile._id == req.auth.payload._id; //if the user matches the logged in user
    if (!user) {
        return res.status(403).json({
            // 403 means unauthorized access
            error: 'Access denied'
        });
    }
    next();
}