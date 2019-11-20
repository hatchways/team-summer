var express = require("express");
var router = express.Router();
const auth = require('../controllers/authController.api.js');
const { verifyJwt } = require('../middlewares');

router.get("/welcome", verifyJwt, function (req, res) {
  const { name } = req.user;
  res.status(200).send({ welcomeMessage: `${name} - Step 1 (completed)` });
});

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
