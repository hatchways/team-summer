const express = require('express');
const router = express.Router();
const investment = require('../controllers/Investment')
const { isAuth } = require('../middlewares');

router.post('/', isAuth, investment.addInvestment)

module.exports = router;