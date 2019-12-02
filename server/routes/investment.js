const express = require('express');
const router = express.Router();
const investment = require('../controllers/Investment')
const { isAuth } = require('../middlewares');

router.post('/invest', isAuth, investment.makePayment);
router.post('/', isAuth, investment.addInvestment)//should this be used in post invest?
router.get('/stripe-key', isAuth, investment.sendKey);

module.exports = router;