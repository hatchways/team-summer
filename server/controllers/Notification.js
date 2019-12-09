const { Notification } = require('../models');
const { ObjectId } = require('mongoose').Types;

exports.getNotifications = (req, res) => {
  if (req.user._id !== userId) {
    return res.status(403).json({
      error: 'Access denied.'
    });
  }
  const { userId } = req.params;
  Notification.find({ user: userId })
    .exec((err, notifications) => {
      if (err) return res.status(400).json({ err });

      return res.status(200).json(notifications);
    });
};

exports.createNotification = async (req, res) => {
  const investorId = req.user._id;
  const { projectOwnerId, investmentAmount, projectId } = req.body;

  const notification = await Notification.create({
    user: ObjectId(projectOwnerId),
    investmentAmount,
    investor: ObjectId(investorId),
    project: ObjectId(projectId)
  })

  if (notification) {
    return res.status(200).json(notification);
  } else {
    return res.status(400).json({ err: 'Notification could not be created.' })
  }
};