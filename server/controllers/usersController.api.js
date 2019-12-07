'use strict';
const { User, Investment, Message } = require('../models');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');


exports.getUser = async (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .populate('projects')
    .populate({
      path: 'investments',
      populate: {
        path: 'project'
      }
    })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found'
        });
      }
      const { _id, name, email, about, location, projects, profilePic, investments } = user;
      return res.status(200).json({
        _id,
        name,
        email,
        about,
        location,
        projects,
        profilePic,
        investments,
        notificationCount: 8
      });
    });
};

exports.editUser = (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) return res.status(422).json({
      errors: [{
        title: 'File Upload Error',
        detail: err.message
      }]
    });

    const { name, location, about, profilePic: newProfilePic } = req.body;
    const profilePic = req.file ? req.file.location : newProfilePic;
    const newInfo = { name, location, about, profilePic };
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newInfo },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'User could not be updated.'
          });
        }
        const { name, location, about, profilePic } = user;
        return res.status(200).json({ name, location, about, profilePic });
      }
    )
  })
}