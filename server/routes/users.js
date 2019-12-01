const express = require('express');
const router = express.Router();
const getUser = require('../controllers/authController.api').userById;
const { isAuth } = require('../controllers/authController.api');
const { editUser } = require('../controllers/usersController.api')

router.get('/users/:id', (req, res) => {
  res.status(200).json(req.profile);
});

router.put('/users/:id', isAuth, editUser);

router.param('id', getUser);

module.exports = router;
