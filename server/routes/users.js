const express = require('express');
const router = express.Router();
const { isAuth, userById } = require('../middlewares');
const users = require('../controllers/usersController.api');


router.get('/:id', (req, res) => {
  res.status(200).json(req.profile);
});

router.param('id', userById);

module.exports = router;



  
// const express = require('express');
// const router = express.Router();
// const getUser = require('../controllers/authController.api').userById;

// router.get('/users/:id', (req, res) => {
//   res.status(200).json(req.profile);
// });

// router.param('id', getUser);

// module.exports = router;