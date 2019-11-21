var express = require("express");
var router = express.Router();
const auth = require('../controllers/authController.api.js');
const users = require('../controllers/usersController.api.js');
const { verifyJwt } = require('../middlewares');

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/users/:id', users.getUser)


// EG usage of verifyJwt middleware for protected routes
// Works with header format:  authorization: {bearer} {token}

// router.get("/route", verifyJwt, function (req, res) {
//   const { name } = req.user;
//   res.status(200).send({ message: `welcome ${name}` });
// });

module.exports = router;
