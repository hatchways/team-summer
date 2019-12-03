const express = require('express');
const router = express.Router();
const { getUser, editUser } = require('../controllers/usersController.api')
const { isAuth } = require('../middlewares');

router.get('/:id', getUser);

router.put('/:id', isAuth, editUser);

module.exports = router;
