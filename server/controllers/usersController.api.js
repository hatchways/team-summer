'use strict';
const { User } = require('../models');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

exports.getUser = (req, res) => {
  const { id } = req.body;
  User.findOne({ id }, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'an error occurred' });
    } else if (user) {
      const { id, name, email, location, description, profilePic } = user;
      return res.status(200).json({
        id,
        name,
        email,
        location,
        description,
        profilePic
      });
    } else {
      return res.status(400).json({ message: 'an error occurred' });
    }
  });
};

exports.editUser = (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) return res.status(422).json({ errors: [{ title: 'File Upload Error', detail: err.message }] });

    const { name, location, description } = req.body;
    const profilePic = req.file.location;
    const newInfo = { name, location, description, profilePic };
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: newInfo },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'You are not authorized to perform this action!'
          });
        }
        user.password = null;
        res.status(200).json(user);
      }
    )
  })
}