const express = require("express");
const router = express.Router();
const payments = require('../controllers/paymentsController.api');
const { isAuth, userById } = auth;


app.get("/stripe-key", payments.sendKey);

app.post("/pay", payments.pay)

module.exports = router;
