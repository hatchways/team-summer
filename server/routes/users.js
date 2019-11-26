const express = require('express');
const router = express.Router();
const getUser = require('../controllers/authController.api').userById;

router.get('/user/:id', (req, res) => {
  res.status(200).json(req.profile);
});

router.param('id', getUser);

module.exports = router;
