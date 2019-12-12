const { Notification } = require('../models');

exports.getNotifications = (req, res) => {
  if (req.user._id !== req.params.userId) {
    return res.status(403).json({
      error: 'Access denied.'
    });
  }
  const { userId } = req.params;
  Notification.find({ user: userId })
    .populate({ path: 'user', select: 'name' })
    .populate({ path: 'investor', select: 'name profilePic' })
    .populate({ path: 'project', select: 'title' })
    .sort([['date', 'desc']])
    .exec((err, notifications) => {
      if (err) return res.status(400).json({ err });

      return res.status(200).json(notifications);
    });
};