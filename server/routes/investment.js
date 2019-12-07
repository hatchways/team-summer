const express = require('express');
const router = express.Router();
const investment = require('../controllers/Investment');
const { isAuth } = require('../middlewares');

router.post('/invest', isAuth, investment.makePayment);
router.get('/:id', investment.getInvestment);

module.exports = router;