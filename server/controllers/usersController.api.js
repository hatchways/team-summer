'use strict';
const { User } = require('../models');

exports.getUser = (req,res) => {
    const { id } = req.body;
    User.findOne({
        id
    }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'an error occurred' });
        } else if (user) {
            const { id, name, email } = user;
            return res.json({
                status: 200,
                id,
                name,
                email
            });
        } else {
            return res.status(500).json({ message: 'an error occurred' });
        }
    });
}