const express = require('express');
const router = express.Router();
const { editUser } = require('../controllers/usersController.api')
const { isAuth, userById } = require('../middlewares');


router.get('/:id', (req, res) => {
  res.status(200).json(req.profile);
});

router.put('/:id', isAuth, editUser);

router.param('id', userById);

module.exports = router;
