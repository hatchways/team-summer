const { Notification } = require('../models');
const { ObjectId } = require('mongoose').Types;

exports.getNotifications = (req, res) => {
  const userId = req.user._id;

  Notification.find({ _id: userId })
    .exec((err, notifications) => {
      if (err) return res.status(400).json({ err });

      return res.status(200).json(notifications);
    });
};

exports.createNotification = (req, res) => {
  const investorId = req.user._id;
  const { projectOwnerId, investmentAmount, projectId } = req.body;

  Notification.create({
    user: ObjectId(projectOwnerId),
    investmentAmount,
    investor: ObjectId(investorId),
    project: ObjectId(projectId)
  })
    .exec((err, notification) => {
      if (err) return res.status(400).json({ err });

      return res.status(200).json(notification);
    });
};