const express = require("express");
const router = express.Router();
const payments = require('../controllers/paymentsController.api');
const { isAuth, userById } = auth;


app.get("/", (req, res) => {
  // Display checkout page
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/stripe-key", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post("/pay", payments.pay)

module.exports = router;
