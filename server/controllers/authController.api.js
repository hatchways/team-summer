'use strict';

const express = require('express');
const router = express.Router();
const db = require('../config/db.config.js');
const User = db.user;
const jwt = require('jsonwebtoken');
const passport = require('passport')
const bcrypt = require('bcrypt');
const saltRounds = 12;
const JWTSecret = process.env.JWT_SECRET || 'some secret';


exports.register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      username,
      email,
      password
    })
    newUser.save( function(err) {
        if (err) {
            console.log('error - username not unique')
            return res.json({
                status: 401,
                message: 'username unavailable'
            })
        }
        else {
            console.log('user created')
            return res.json({
                status: 201,
                message: 'success'
            })
        }
    });
}

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password; 

    User.findOne({
        username
    }, function (err, user) {
        if (err) {
            console.log('find failed', err)
            return res.status(500).json({ message: 'an error occurred' });
        }
        else if (!user) {
            console.log('invalid username')
            return res.json({
                status: 401,
                message: 'invalid username'
            })
        } 
        else {
            user.verifyPassword(password, function (err, isMatch) {
                console.log('valid pwd')
                if (isMatch) {
                    delete user.password;
                    const token = jwt.sign(user, JWTSecret, { expiresIn: '30m' });
                    return res.json({
                        status: 200,
                        user,
                        token
                    });
                } 
                else {
                    console.log('invalid pwd')
                    return res.json({
                        status: 401,
                        message: 'invalid'
                    })
                }
            });
        }
    });
}
