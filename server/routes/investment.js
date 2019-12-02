const express = require('express');
const router = express.Router();
const investment = require('../controllers/Investment')
const { isAuth } = require('../middlewares');

router.post('/invest', investment.invest);
// router.post('/', isAuth, investment.addInvestment)//w/in invest
router.get('/stripe-key', investment.sendKey);

module.exports = router;