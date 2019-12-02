const express = require('express');
const router = express.Router();
const investment = require('../controllers/Investment');
const { isAuth, userById } = require('../middlewares');

router.post('/', isAuth, investment.addInvestment);
router.get('/:userId', investment.getInvestment);

router.param('userId', userById);

module.exports = router;