const express = require("express");
const router = express.Router();

const auth = require('../controllers/authController.api');

router.post('/register', auth.register);
router.post('/authenticate', auth.login);

module.exports = router;