var express = require("express");
var router = express.Router();
const auth = require('../controllers/authController.api.js');

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
